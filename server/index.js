import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
app.use(express.json())
app.use(express.static(path.join(root, 'dist')))
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'personal-portfolio' }))
app.post('/api/contact', (req, res) => res.status(201).json({ ok: true, message: 'Message queued for the portfolio owner.', received: { name: req.body.name, email: req.body.email } }))
app.use((req, res, next) => { if (req.method === 'GET' && req.accepts('html')) return res.sendFile(path.join(root, 'dist', 'index.html')); next() })
const port = Number(process.env.PORT || 4101)
app.listen(port, () => console.log(`Portfolio API on http://localhost:${port}`))
