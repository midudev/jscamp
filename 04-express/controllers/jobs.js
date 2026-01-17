import { JobModel } from "../models/job"

export class JobController {
  static async getAll(req, res) {
    const { text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query

    const paginatedJobs = await JobModel.getAll({ text, title, level, limit, technology, offset })

    return res.json({ data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber })
  }

  static async getId(req, res) {
    const { id } = req.params

    const job = await JobModel.getById(id)

    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }

    return res.json(job)
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, data } = req.body
    const newJob = await JobModel.create({ titulo, empresa, ubicacion, data })

    return res.status(201).json(newJob)
  }

  static async update(req, res) {}
  static async partialUpdate(req, res) {}
  static async delete(req, res) {}
}