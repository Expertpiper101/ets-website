import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import authRouter from './routes/auth.js'
import crmRouter from './routes/crm.js'
import enquiriesRouter from './routes/enquiries.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 4000)

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'ets-crm-api' })
})

app.use('/api/auth', authRouter)
app.use('/api/crm', crmRouter)
app.use('/api/enquiries', enquiriesRouter)

app.use((err, _req, res, _next) => {
  if (err?.issues) {
    return res.status(400).json({ error: 'Validation failed', issues: err.issues })
  }

  if (err?.code === '23505') {
    return res.status(409).json({ error: 'Record already exists' })
  }

  console.error(err)
  return res.status(500).json({ error: 'Server error' })
})

app.listen(port, () => {
  console.log(`ETS CRM API running on http://localhost:${port}`)
})
