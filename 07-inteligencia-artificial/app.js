import express from 'express'
import cors from 'cors'
import { rateLimitMiddleware } from './rate-limit.js'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get('/api', rateLimitMiddleware, (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() })
})

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})

export default app
