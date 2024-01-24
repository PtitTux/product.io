import fp from 'fastify-plugin'
import { ResponseValidationError } from 'fastify-type-provider-zod'
import { ZodError } from 'zod'
import { HttpError } from 'http-errors'

export default fp (async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode ?? 500
    let message = 'Internal Server Error'

    if (error instanceof ZodError) {
      fastify.log.error(error.issues.map(issue => `Validation Error: ${issue.message} for ${issue.path.join(',')}`).join('\n'))
      message = 'Validation Error'
    }
    else if (error instanceof ResponseValidationError) {
      fastify.log.error(`Response Validation Error: ${error.message}`)
      message = 'Validation Error'
    }
    else if (error instanceof HttpError) {
      fastify.log.error(`${error.name}: ${error.message}`)
      message = error.message
    }
    else if (error instanceof Error) {
      fastify.log.error(`${error.stack}`)
    }

    reply.status(statusCode).send({
      statusCode,
      message,
    })
  })
})
