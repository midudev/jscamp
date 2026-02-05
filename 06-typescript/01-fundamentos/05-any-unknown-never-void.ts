// ================================
// ANY, UNKNOWN, NEVER y VOID
// ================================

// ================================
// ANY - El tipo que desactiva TypeScript
// ================================

let cualquierCosa: any = "hola"
cualquierCosa = 42
cualquierCosa = true

const result = cualquierCosa + 8

// ================================
// UNKNOWN - La alternativa segura a any
// ================================

let valorDesconocido: unknown = "hola"
valorDesconocido = 42
valorDesconocido = true
valorDesconocido = { nombre: "test" }

// type narrowing
if (typeof valorDesconocido === 'number') {
  const resultadoSeguro = valorDesconocido + 8
  console.log(resultadoSeguro)
} else if (typeof valorDesconocido === 'string') {
  console.log(valorDesconocido.toUpperCase())
}

// ================================
// VOID - Funciones que no retornan nada
// ================================

function saludar(): void {
  console.log("Hola!")
}

function logError(errorMessage: string): void {
  if (errorMessage.length === 0) {
    return undefined
  }

  console.error("Error:", errorMessage)
}

// ================================
// NEVER - El tipo imposible
// ================================
function bucleInfinito(): never {
  while (true) {
    // ...
  }
}

function throwErrror(message: string): never {
  throw new Error(message)
}

function revisarValor(x: number | string) {
  if (typeof x === 'number') {
    console.log("Es un número:", x)
  } else if (typeof x === 'string') {
    console.log("Es una cadena:", x)
  } else {
    // Aquí, x es de tipo 'never'
    throwErrror("Tipo no soportado")
  }
}

// ================================
// COMPARATIVA
// ================================

/*
┌──────────┬────────────────────────────────────────────────────────┐
│ Tipo     │ Descripción                                            │
├──────────┼────────────────────────────────────────────────────────┤
│ any      │ Acepta todo, permite todo. EVITAR.                     │
│ unknown  │ Acepta todo, pero requiere verificación. PREFERIBLE.   │
│ void     │ Para funciones que no retornan valor útil.             │
│ never    │ Para casos imposibles o funciones que no terminan.     │
└──────────┴────────────────────────────────────────────────────────┘
*/
