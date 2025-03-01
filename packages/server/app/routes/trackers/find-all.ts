import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { TrackerSchemaList } from '#Models/trackers'
import { findAll } from '#Repositories/trackers/find-all'
import z from 'zod'

export default async function handler(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>()

  fastify.get('/trackers', {
    schema: {
      tags: ['trackers'],
      description: 'Get All Trackers',
      response: {
        200: z.array(TrackerSchemaList),
      },
    },
  }, async (request, reply) => {
    const trackers = await findAll(fastify.db)
    reply.code(200).send(trackers)
  })
}
