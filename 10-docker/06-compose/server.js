import express from 'express'
import pg from 'pg'

const { Pool } = pg

const app = express()
const PORT = process.env.PORT || 3000

// La URL apunta al host "db", que es el NOMBRE del servicio en compose.yaml.
// Docker Compose resuelve ese nombre por nosotros dentro de su red interna.
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || 'postgres://midu:secreto@db:5432/midudb',
})

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() AS ahora')
    res.json({
      mensaje: '¡App + PostgreSQL funcionando con Docker Compose! 🐳',
      hora_de_la_base_de_datos: rows[0].ahora,
    })
  } catch (err) {
    res.status(500).json({ error: 'No se pudo conectar a la base de datos', detalle: err.message })
  }
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`🚀 App escuchando en http://localhost:${PORT}`)
})
