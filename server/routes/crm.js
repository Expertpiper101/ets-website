import { Router } from 'express'
import { z } from 'zod'
import { query } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

const leadSchema = z.object({
  company: z.string().min(2),
  contactName: z.string().min(2),
  email: z.email().optional().or(z.literal('')),
  phone: z.string().optional(),
  product: z.string().min(2),
  stage: z.enum(['new_lead', 'quoted', 'approval', 'won', 'lost']).default('new_lead'),
  value: z.number().nonnegative().default(0),
})

router.get('/dashboard', async (_req, res) => {
  const [stats, leads, jobs, contacts, approvals] = await Promise.all([
    query(`
      select
        (select count(*) from leads where stage not in ('won', 'lost'))::int as open_enquiries,
        (select count(*) from leads where stage = 'quoted')::int as quotes_pending,
        (select count(*) from artwork_approvals where status != 'approved')::int as artwork_approvals,
        (select count(*) from production_jobs where status != 'dispatched')::int as production_jobs
    `),
    query('select * from leads order by created_at desc limit 50'),
    query('select * from production_jobs order by due_date asc nulls last limit 20'),
    query('select * from contacts order by created_at desc limit 20'),
    query('select * from artwork_approvals order by created_at desc limit 20'),
  ])

  res.json({
    stats: stats.rows[0],
    leads: leads.rows,
    jobs: jobs.rows,
    contacts: contacts.rows,
    approvals: approvals.rows,
  })
})

router.get('/leads', async (_req, res) => {
  const result = await query('select * from leads order by created_at desc')
  res.json(result.rows)
})

router.post('/leads', async (req, res) => {
  const lead = leadSchema.parse(req.body)
  const result = await query(
    `insert into leads (company, contact_name, email, phone, product, stage, value)
     values ($1, $2, $3, $4, $5, $6, $7)
     returning *`,
    [lead.company, lead.contactName, lead.email || null, lead.phone || null, lead.product, lead.stage, lead.value],
  )
  res.status(201).json(result.rows[0])
})

router.get('/quotes', async (_req, res) => {
  const result = await query('select * from quotes order by created_at desc')
  res.json(result.rows)
})

router.get('/jobs', async (_req, res) => {
  const result = await query('select * from production_jobs order by due_date asc nulls last')
  res.json(result.rows)
})

router.get('/contacts', async (_req, res) => {
  const result = await query('select * from contacts order by created_at desc')
  res.json(result.rows)
})

router.get('/approvals', async (_req, res) => {
  const result = await query('select * from artwork_approvals order by created_at desc')
  res.json(result.rows)
})

export default router
