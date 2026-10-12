import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { query } from '../db.js'

const router = Router()

const registerSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(['customer', 'sales', 'production', 'admin']).default('customer'),
})

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '8h' },
  )
}

router.post('/register', async (req, res) => {
  const payload = registerSchema.parse(req.body)
  const passwordHash = await bcrypt.hash(payload.password, 12)

  const result = await query(
    `insert into users (name, company, email, password_hash, role)
     values ($1, $2, $3, $4, $5)
     returning id, name, company, email, role`,
    [payload.name, payload.company, payload.email.toLowerCase(), passwordHash, payload.role],
  )

  const user = result.rows[0]
  res.status(201).json({ user, token: signToken(user) })
})

router.post('/login', async (req, res) => {
  const payload = loginSchema.parse(req.body)
  const result = await query('select * from users where email = $1', [payload.email.toLowerCase()])
  const user = result.rows[0]

  if (!user || !(await bcrypt.compare(payload.password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      company: user.company,
      email: user.email,
      role: user.role,
    },
    token: signToken(user),
  })
})

export default router
