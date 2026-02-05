import type { User, UserEntity } from './00-types.ts'

// type User = {
//   name: string
//   age: number
// }

const user: User = {
  name: 'midudev',
  age: 30,
  email: 'miduga@gmail.com',
  role: 'admin',
  company: {
    name: 'mi empresa',
    address: 'mi direccion'
  }
}

const otroUser: User = {
  name: 'pepe',
  age: 25,
  role: 'user',
  email: 'pheralb@gmail.com'
}

const anotherUser: User = {
  name: 'ana',
  role: 'editor',
  age: 28,
}

const entity: UserEntity = {
  id: 12345,
  name: "midudev",
  age: 30,
  role: "admin",
  email: "miduga@gmail.com",
  birthdate: new Date("1993-01-01"),
}

type Translations = {
  [key: string]: string
}

const translations: Translations = {
  hello: "Hola",
  goodbye: "Adiós",
}