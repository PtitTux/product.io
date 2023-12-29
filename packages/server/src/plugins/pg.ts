import process from 'node:process'
import fp from 'fastify-plugin'
import { Pool } from 'pg'

declare module 'fastify' {
  interface FastifyInstance {
    pg: Pool
  }
}

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
})

export default fp (async (fastify) => {
  fastify.decorate('pg', pool)
})
