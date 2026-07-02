import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000
const SALUDO = process.env.SALUDO || '¡Hola desde Node.js dentro de Docker! 🐳'

app.get('/', (req, res) => {
  console.log('[GET] /')

  res.json({
    mensaje: SALUDO,
    hostname: process.env.HOSTNAME, // el id del contenedor
    timestamp: new Date().toISOString(),
  })
})

// Endpoint de salud, útil para HEALTHCHECK y orquestadores
app.get('/health', (req, res) => {
  console.log('[GET] /health')
  res.status(200).json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
