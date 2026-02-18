// Rate limit en memoria
const WINDOW_MS = 60 * 1000 // 1 minuto
const MAX_REQUESTS = 30
const rateLimit = new Map()

// Limpiar entradas expiradas cada minuto
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimit) {
    if (now - entry.start > WINDOW_MS) rateLimit.delete(ip)
  }
}, WINDOW_MS)

export function rateLimitMiddleware (req, res, next) {
  const ip = req.ip
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now - entry.start > WINDOW_MS) {
    rateLimit.set(ip, { start: now, count: 1 })
    return next()
  }

  if (entry.count >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Demasiadas peticiones. Intenta de nuevo más tarde.' })
  }

  entry.count++
  return next()
}
