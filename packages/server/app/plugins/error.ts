import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

export default fp (async (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode ?? 500
    let message = 'Internal Server Error'

    if (error.code === 'FST_ERR_VALIDATION') {
      fastify.log.error(`Validation Error ${error}`)
      message = 'Validation Error'
    }

    reply.status(statusCode).send({
      statusCode,
      message,
    })
  })
})
