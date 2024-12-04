import { timestamp, uuid } from 'drizzle-orm/pg-core'

export const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
}

export const externalId = {
  externalId: uuid().defaultRandom().notNull(),
}
