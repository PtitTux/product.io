import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { findAll } from '#Repositories/trackers/find-all'

export default async function handler(fastify: FastifyInstance) {
  fastify.withTypeProvider<TypeBoxTypeProvider>()

  fastify.get('/trackers', {
    schema: {
      tags: ['trackers'],
      description: 'Get All Trackers',
    },
  }, async (request, reply) => {
    const trackers = await findAll(fastify.db)
    reply.code(200).send(trackers)
  })
}
