import 'dotenv/config'
import path from 'node:path'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'
import autoLoad from '@fastify/autoload'

export async function build() {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  })

  const startPlugins = performance.now()
  await fastify.register(autoLoad, { dir: path.join(__dirname, 'plugins') })
  fastify.log.info(`Plugins ${(performance.now() - startPlugins).toFixed(2)} ms`)

  const startRoutes = performance.now()
  await fastify.register(autoLoad, { dir: path.join(__dirname, 'routes') })
  fastify.log.info(`Routes ${(performance.now() - startRoutes).toFixed(2)} ms`)

  return fastify
}

async function start() {
  let fastify

  const start = performance.now()
  try {
    fastify = await build()
  }
  catch (e) {
    console.error('Error occured while building fastify')
    console.error(e)
    return
  }

  fastify.log.info(`Successfully built fastify instance in ${(performance.now() - start).toFixed(2)} ms`)

  await fastify.listen({ port: 3000 })
}

start()
