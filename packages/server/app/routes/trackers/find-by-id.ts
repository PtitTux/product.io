import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { TrackerSchemaGet } from '#Models/trackers'
import { findById } from '#Repositories/trackers/find-by-id'
import z from 'zod'

const Params = z.object({
  id: z.string().uuid().describe('UUID of tracker'),
})

type IParams = z.infer<typeof Params>

export default async function handler(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>()

  fastify.get<{
    Params: IParams
  }>('/trackers/:id', {
    schema: {
      tags: ['trackers'],
      description: 'Get Tracker by Id',
      params: Params,
      response: {
        200: TrackerSchemaGet,
      },
    },
  }, async (request, reply) => {
    const tracker = await findById(fastify.db, request.params.id)
    reply.code(200).send(tracker)
  })
}
