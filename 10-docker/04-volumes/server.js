const { createServer } = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

// Intentamos leer la URL de conexión a la Base de Datos
const DB_HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'visitas.txt');

// Asegurar que exista el directorio de datos para persistencia (volúmenes / bind mounts)
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

// Inicializar el contador si no existe
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '0', 'utf-8');
}

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/visitar') {
    let visitas = parseInt(fs.readFileSync(DATA_FILE, 'utf-8') || '0', 10);
    visitas++;
    fs.writeFileSync(DATA_FILE, visitas.toString(), 'utf-8');
    
    return res.end(JSON.stringify({
      message: '¡Vamos! 📈',
      contador: visitas
    }));
  }

  // Ruta por defecto
  let visitasActuales = fs.readFileSync(DATA_FILE, 'utf-8') || '0';
  res.end(JSON.stringify({
    message: 'HOLA QUÉ PASA CHAVALES',
    instrucciones: 'Visita /visitar para registrar una nueva visita persistente en disco.',
    contador_actual: parseInt(visitasActuales, 10),
    db_config: `Conectando por red al host de base de datos: "${DB_HOST}"`
  }));
});

server.listen(PORT, () => {
  console.log(`Servidor de volúmenes escuchando en http://localhost:${PORT}`);
});
