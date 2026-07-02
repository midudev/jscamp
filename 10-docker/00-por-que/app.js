// 🐳 "En mi máquina funciona"
// Mini app que usa funciones MODERNAS de JavaScript.
// Funciona en Node 18+, pero PETA en Node 16 (y anteriores).

console.log(`👉 Ejecutando con Node ${process.version}\n`)

const pedido = {
  id: 1,
  cliente: 'midudev',
  productos: ['Docker', 'Café'],
}

// 1) structuredClone: es un global que NO existe antes de Node 17
const copia = structuredClone(pedido)
copia.cliente = 'otra persona'

console.log('Original:', pedido.cliente) // midudev
console.log('Copia:   ', copia.cliente) // otra persona

// 2) Array.prototype.findLast: llegó en Node 18
const numeros = [1, 2, 3, 4, 5]
const ultimoPar = numeros.findLast((n) => n % 2 === 0)
console.log('Último número par:', ultimoPar) // 4

console.log('\n✅ ¡Todo funcionó! Tu versión de Node soporta estas funciones.')
