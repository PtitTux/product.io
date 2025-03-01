import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type z from 'zod'
import { TrackerSchemaGet, TrackerSchemaPost } from '#Models/trackers'
import { create } from '#Repositories/trackers/create'
import { ErrorSchema } from '../Schemas'

type IBody = z.infer<typeof TrackerSchemaPost>

export default async function handler(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>()

  fastify.post<{
    Body: IBody
  }>('/trackers', {
    schema: {
      tags: ['trackers'],
      description: 'Create a tracker',
      body: TrackerSchemaPost,
      response: {
        201: TrackerSchemaGet,
        400: ErrorSchema,
        500: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const tracker = await create(fastify.db, request.body)
    reply.code(201).send(tracker)
  })
}
