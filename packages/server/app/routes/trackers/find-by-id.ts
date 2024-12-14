import type { FastifyInstance } from 'fastify'
import { findByExternalId } from '#Repositories/trackers/find-by-externalId'

interface IParams {
  id: string
}

export default async function handler(fastify: FastifyInstance) {
  fastify.get<
    { Params: IParams }
  >('/:id', async (request, reply) => {
    const tracker = await findByExternalId(fastify.db, request.params.id)
    reply.code(200).send(tracker)
  })
}
