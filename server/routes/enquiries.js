import { Router } from 'express'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const router = Router()

const enquirySchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.email().optional().or(z.literal('')),
  phone: z.string().optional(),
  projectType: z.string().min(2),
  brief: z.string().min(10),
})

function createTransporter() {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'ENQUIRY_TO_EMAIL']
  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing email configuration: ${missing.join(', ')}`)
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

router.post('/', async (req, res) => {
  const enquiry = enquirySchema.parse(req.body)
  const transporter = createTransporter()
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL || process.env.SMTP_USER
  const safe = {
    name: escapeHtml(enquiry.name),
    company: escapeHtml(enquiry.company),
    email: escapeHtml(enquiry.email || 'Not provided'),
    phone: escapeHtml(enquiry.phone || 'Not provided'),
    projectType: escapeHtml(enquiry.projectType),
    brief: escapeHtml(enquiry.brief).replaceAll('\n', '<br />'),
  }

  await transporter.sendMail({
    from: `"ETS Website" <${fromEmail}>`,
    to: process.env.ENQUIRY_TO_EMAIL,
    replyTo: enquiry.email || undefined,
    subject: `New ETS website enquiry - ${enquiry.projectType}`,
    text: [
      'New enquiry from the ETS website',
      '',
      `Name: ${enquiry.name}`,
      `Company: ${enquiry.company}`,
      `Email: ${enquiry.email || 'Not provided'}`,
      `Phone: ${enquiry.phone || 'Not provided'}`,
      `Project type: ${enquiry.projectType}`,
      '',
      'Brief:',
      enquiry.brief,
    ].join('\n'),
    html: `
      <h2>New enquiry from the ETS website</h2>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Company:</strong> ${safe.company}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Phone:</strong> ${safe.phone}</p>
      <p><strong>Project type:</strong> ${safe.projectType}</p>
      <p><strong>Brief:</strong></p>
      <p>${safe.brief}</p>
    `,
  })

  res.status(202).json({ ok: true })
})

export default router
