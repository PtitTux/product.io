import process from 'node:process'
import type { FastifyInstance, RouteShorthandOptions } from 'fastify'
import Fastify from 'fastify'
import pino from 'pino'

const fastifyServer: FastifyInstance = Fastify({
  logger: pino({ level: 'info' }),
})

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
}

fastifyServer.get('/ping', opts, async () => {
  return { pong: 'it worked!' }
})

async function start() {
  try {
    await fastifyServer.listen({ port: 3000 })
  }
  catch (err) {
    fastifyServer.log.error(err)
    process.exit(1)
  }
}

start()
