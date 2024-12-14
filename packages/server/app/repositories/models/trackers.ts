import type { InferSelectModel } from 'drizzle-orm'
import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { externalId, timestamps } from './hooks'

export const TrackerSchema = pgTable('trackers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }).notNull(),
  label: varchar({ length: 4000 }).default('Tracker').notNull(),
  description: text(),
  color: varchar({ length: 7 }).default('#000000'),
  ...timestamps,
  ...externalId,
})

export type TrackerType = InferSelectModel<typeof TrackerSchema>

export type TrackerInsert = typeof TrackerSchema.$inferInsert
