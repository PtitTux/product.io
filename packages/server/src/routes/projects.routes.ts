import type { FastifyInstance } from 'fastify'
import z from 'zod'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import ProjectRepository from '../repositories/project.repository'
import { ProjectSchema } from '../models/project'

const GetProjectParams = z.object({
  id: z.string().uuid(),
})

export default async function projects(fastify: FastifyInstance) {
  const repository = new ProjectRepository()
  const instance = fastify.withTypeProvider<ZodTypeProvider>()

  instance.route({
    method: 'GET',
    url: '/projects/:id',
    schema: {
      tags: ['projects'],
      params: GetProjectParams,
      response: {
        200: z.union([ProjectSchema, z.null()]),
      },
    },
    handler: async (request, reply) => {
      const project = await repository.findOne(request.id)
      reply.code(200).send(project)
    },
  })
}
