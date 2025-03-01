import type { FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fp from 'fastify-plugin'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'
import { version } from '../../package.json'

export default fp(async (fastify: FastifyInstance) => {
  await fastify.register(fastifySwagger, {
    mode: 'dynamic',
    openapi: {
      info: {
        title: 'Product.io API',
        version,
      },
      tags: [
        { name: 'trackers', description: 'Trackers related end-points' },
      ],
    },
    transform: jsonSchemaTransform,
  })

  await fastify.register(fastifySwaggerUI, {
    routePrefix: '/openapi',
    initOAuth: {},
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
    theme: {
      title: 'API Documentation',
    },
  })
})
