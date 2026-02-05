// ================================
// INTERFACES EN TYPESCRIPT
// ================================

// Las interfaces definen la "forma" de un objeto
// Son contratos que especifican qué propiedades y métodos debe tener

interface Persona {
  readonly name: string
  readonly age: number
}

interface Identificable {
  id: `user-${number}`
}

interface User extends Persona, Identificable {
  email?: string
  role: "admin" | "user" | "editor"
  saludar: () => string
  login(): boolean
}

interface Admin extends User {
  adminLevel: number
  accessAllAreas: boolean
  rootAdmin(): void
}

interface Hero {
  nombre: string
}

interface Hero {
  poder: string
}

const hero: Hero = {
  nombre: "Superman",
  poder: "Volar"
}

const user: User = {
  id: "user-12345",
  name: "midudev",
  age: 30,
  email: "miduga@gmail.com",
  role: "admin",
  saludar: () => "Hola!",
  login() {
    return true
  }
}

interface Calculadora {
  (a: number, b: number): number
}

const calcular: Calculadora = (x, y) => x + y

// ================================
// INTERFACES PARA CLASES
// ================================

interface MediaPlayer {
  play(): void
  pause(): void
  stop(): void
}

interface AudioPlayer {
  volumen: number
}

class Reproductor implements MediaPlayer, AudioPlayer {
  volumen: number = 50

  play(): void {
    console.log("Reproduciendo...")
  }
  pause(): void {
    console.log("Pausado")
  }
  stop(): void {
    console.log("Detenido")
  }
}