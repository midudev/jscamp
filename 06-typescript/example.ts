function double(n: number) {
  return n * 2
}

const input = '2'
let parsedInput: number

if (typeof input === 'string') {
  parsedInput = Number(input)
} else if (typeof input === 'number') {
  parsedInput = input
} else {
  parsedInput = 0
}

const result = double(parsedInput) // 4

console.log(result)
