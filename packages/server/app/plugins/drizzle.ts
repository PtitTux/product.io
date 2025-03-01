import type { NodePgClient, NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { FastifyInstance } from 'fastify'
import process from 'node:process'
import { drizzle } from 'drizzle-orm/node-postgres'
import fp from 'fastify-plugin'

export type DrizzleInstancePg = NodePgDatabase<Record<string, never>> & {
  $client: NodePgClient
}

declare module 'fastify' {
  interface FastifyInstance {
    db: DrizzleInstancePg
  }
}

export const db = drizzle({
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  },
  casing: 'snake_case',
})

export default fp (async (fastify: FastifyInstance) => {
  fastify.decorate('db', db)
})
