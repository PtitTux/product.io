import { integer, timestamp, uuid } from 'drizzle-orm/pg-core'

export const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
}

export const id = {
  id: uuid().defaultRandom().notNull(),
  internalId: integer().primaryKey().generatedAlwaysAsIdentity(),
}
