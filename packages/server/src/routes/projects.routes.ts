import type { FastifyInstance } from 'fastify'
import z from 'zod'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { ProjectSchema } from '../models/project'
import ProjectController from '../controllers/projectController'

const GetProjectParams = z.object({
  id: z.string().uuid(),
})

export default async function projects(fastify: FastifyInstance) {
  const controller = new ProjectController()
  const instance = fastify.withTypeProvider<ZodTypeProvider>()

  instance.route({
    method: 'GET',
    url: '/projects/:id',
    schema: {
      tags: ['projects'],
      params: GetProjectParams,
      response: {
        200: ProjectSchema,
      },
    },
    handler: async (request, reply) => {
      const project = await controller.findOne(request.params.id)
      reply.code(200).send(project)
    },
  })
}
