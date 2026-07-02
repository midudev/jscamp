import { createServer } from 'node:http'
import confetti from 'canvas-confetti' // Dependencia de producción para probar el bundleado

const PORT = process.env.PORT || 3000

// con los comentarios aqui tal cual
createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(
    JSON.stringify({
      mensaje: 'Imagen mínima creada con multi-stage build 🐳',
      nota: 'Esta imagen final NO contiene esbuild ni el código fuente sin compilar',
      ejemploDependency: 'Hemos importado canvas-confetti con éxito en producción, pero esbuild (devDependencies) se quedó fuera.'
    })
  )
}).listen(PORT, () => {
  console.log(`🚀 Servidor (multi-stage) escuchando en el puerto ${PORT}`)
})
