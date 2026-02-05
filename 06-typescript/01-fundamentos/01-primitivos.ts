// ================================
// TIPOS PRIMITIVOS EN TYPESCRIPT
// ================================

// 1. strings
const nombre = "midudev"
const saludo = `Hola, ${nombre}` // Tipo inferido como string
const vacio: string = ""

// 2. numeros
let color = 0x09f
let infinito = Infinity

// 3. booleanos
let isActive: boolean = true
isActive = false

// 4. nulos e indefinidos
let nulo: null = null
let indefinido: undefined = undefined

let age: number | null = null

const numeroGrande: bigint = 9007199254741991n
const id: symbol = Symbol("id")

// diferencia en la inferencia de datos para adivinar el tipo
// para let y const

const ciudad = "Madrid" 

let pais = "España"
pais = "Mexico" // válido

console.log(pais)