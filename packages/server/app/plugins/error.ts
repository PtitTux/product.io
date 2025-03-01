import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { hasZodFastifySchemaValidationErrors, isResponseSerializationError } from 'fastify-type-provider-zod'

export default fp (async (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, request, reply) => {
    let statusCode = error.statusCode ?? 500
    let message = 'Internal Server Error'
    let details

    if (hasZodFastifySchemaValidationErrors(error)) {
      statusCode = 400
      message = 'Response Validation Error'
      details = {
        issues: error.validation,
        method: request.method,
        url: request.url,
      }
    }

    if (isResponseSerializationError(error)) {
      statusCode = 500
      message = 'Internal Server Error'
      details = {
        issues: error.cause.issues,
        method: error.method,
        url: error.url,
      }
    }

    reply.status(statusCode).send({
      statusCode,
      message,
      details,
    })
  })
})
