import type { FastifyInstance } from 'fastify'
import { findByExternalId } from '#Repositories/trackers/find-by-externalId'

export default async function handler(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      tags: ['Trackers'],
    },
    handler: async (request, reply) => {
      const tracker = await findByExternalId(fastify.db, request.params.id)
      reply.code(200).send(tracker)
    },
  })
}
