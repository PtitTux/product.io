import errors from 'http-errors'
import type { Project } from '../models/project'
import ProjectRepository from '../repositories/projectRepository'

export default class ProjectController {
  private projectRepository: ProjectRepository

  constructor() {
    this.projectRepository = new ProjectRepository()
  }

  public findOne = async (id: string): Promise<Project> => {
    const project = await this.projectRepository.findOne(id)
    if (!project)
      throw new errors.NotFound(`Project with id ${id} not found`)

    return project
  }
}
