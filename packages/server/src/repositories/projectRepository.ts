import type { Project } from '../models/project'
import BaseRepository from './base.repository'

export default class ProjectRepository extends BaseRepository<Project> {
  constructor() {
    super('projects')
  }
}
