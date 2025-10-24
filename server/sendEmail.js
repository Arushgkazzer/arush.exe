import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Basic health check
app.get('/api/health', (req, res) => res.json({ ok: true }))

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {}

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' })
    }

    // Create transporter from env vars
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const target = process.env.TARGET_EMAIL || 'arushsharma0215@gmail.com'

    const mailOptions = {
      from: `${name} <${email}>`,
      to: target,
      subject: `[Portfolio Contact] ${subject}`,
      text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <h3>New contact form message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    }

    const info = await transporter.sendMail(mailOptions)

    return res.json({ ok: true, info })
  } catch (err) {
    console.error('send-email error', err)
    return res.status(500).json({ ok: false, error: err?.message || String(err) })
  }
})

app.listen(PORT, () => {
  console.log(`Email API listening on http://localhost:${PORT}`)
})
