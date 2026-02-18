import { Router } from 'express'
import { JobController } from '../controllers/jobs.js'
import { validateJob, validatePartialJob } from '../schemas/jobs.js'

export const jobsRouter = Router()

function validateCreate (req, res, next) {
  const result = validateJob(req.body)
  if (result.success) {
    req.body = result.data // vamos a tener los datos validados y limpios
    return next()
  }

  return res.status(400).json({ error: 'Invalid request', details: result.error.errors })
}

// Middleware de validación para actualización parcial
const validateUpdate = (req, res, next) => {
  const result = validatePartialJob(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  req.body = result.data
  next()
}

jobsRouter.get('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getId)
jobsRouter.post('/', validateCreate, JobController.create)
jobsRouter.patch('/:id', validateUpdate, JobController.partialUpdate)
jobsRouter.put('/:id', JobController.update)
jobsRouter.delete('/:id', JobController.delete)