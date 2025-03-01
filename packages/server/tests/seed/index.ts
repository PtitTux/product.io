/* eslint-disable perfectionist/sort-imports */
import 'dotenv/config'
import pino from 'pino'
import { seedTrackers } from './trackers'
import { db } from '#Plugins/drizzle'

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
})

async function main() {
  logger.info('Seed starting')

  await seedTrackers(db)

  logger.info('Seed done')
}

main()
