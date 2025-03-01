import process from 'node:process'
import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './dist/drizzle',
  schema: './app/db/models',
  dialect: 'postgresql',
  dbCredentials: {
    user: process.env.DB_USER!,
    host: process.env.DB_HOST!,
    database: process.env.DB_DATABASE!,
    password: process.env.DB_PASSWORD!,
    ssl: false,
  },
  casing: 'snake_case',
})
