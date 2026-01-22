import * as z from 'zod'

const jobSchema = z.object({
  titulo: z
    .string({
      error: 'El título es obligatorio',
    })
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder los 100 caracteres'),
  empresa: z.string(),
  ubicacion: z.string(),
  descripcion: z.string().optional(),
  data: z.object({
    technology: z.array(z.string()),
    modalidad: z.string(),
    nivel: z.string(),
  }),
})

export function validateJob (input) {
  return jobSchema.safeParse(input)
}

export function validatePartialJob (input) {
  return jobSchema.partial().safeParse(input)
}