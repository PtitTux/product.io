import fp from 'fastify-plugin'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'
import { version } from '../../package.json'

export default fp(async (fastify) => {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Product.io API',
        version,
      },
      tags: [
        { name: 'projects', description: 'Projects related end-points' },
      ],
    },
    transform: jsonSchemaTransform,
  })

  await fastify.register(fastifySwaggerUI, {
    routePrefix: '/api/docs',
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
