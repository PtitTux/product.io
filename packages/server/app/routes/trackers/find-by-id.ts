import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { Static } from '@sinclair/typebox'
import type { FastifyInstance } from 'fastify'
import { findByExternalId } from '#Repositories/trackers/find-by-externalId'
import { Type } from '@sinclair/typebox'

const Params = Type.Object({
  id: Type.String({
    pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
    description: 'uuid',
  }),
})

type IParams = Static<typeof Params>

export default async function handler(fastify: FastifyInstance) {
  fastify.withTypeProvider<TypeBoxTypeProvider>()

  fastify.get<{
    Params: IParams
  }>('/:id', {
    schema: {
      tags: ['trackers'],
      params: Params,
    },
  }, async (request, reply) => {
    const tracker = await findByExternalId(fastify.db, request.params.id)
    reply.code(200).send(tracker)
  })
}
