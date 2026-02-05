// ================================
// FUNCIONES EN TYPESCRIPT
// ================================

// ================================
// TIPAR PARÁMETROS Y RETORNO
// ================================

function sumar(a: number, b: number): number {
  return a + b
}

const multiplicar = (a: number, b: number): number => {
  return a * b
}

const dividir = (a: number, b: number): number => a / b

// ================================
// PARÁMETROS OPCIONALES
// ================================
function saludar(nombre: string, apellido?: string): string {
  if (apellido) {
    return `Hola, ${nombre} ${apellido}`
  }

  return `Hola, ${nombre}`
}

// ================================
// PARÁMETROS POR DEFECTO
// ================================
function crearUsuario(nombre: string, rol: string = "admin") {
  return {
    nombre,
    rol
  }
}

// ================================
// REST PARAMETERS
// ================================
function sumarNumeros(...numeros: number[]): number {
  return numeros.reduce((acc, curr) => acc + curr, 0)
}

sumarNumeros(1, 2)
sumarNumeros(1, 2, 3, 4, 5)

// ================================
// TIPO DE FUNCIÓN (Function Types)
// ================================

type OperacionMatematica = (a: number, b: number) => number

const division: OperacionMatematica = (a, b) => a / b
const resta: OperacionMatematica = (a, b) => a - b