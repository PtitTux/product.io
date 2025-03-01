import type { InferSelectModel } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { id, timestamps } from './hooks'

export const TrackerTable = pgTable('trackers', {
  ...id,
  name: varchar({ length: 256 }).notNull(),
  label: varchar({ length: 4000 }).default('Tracker').notNull(),
  description: text(),
  color: varchar({ length: 7 }).default('#000000'),
  ...timestamps,
})

export type TrackerType = InferSelectModel<typeof TrackerTable>

export type TrackerInsert = typeof TrackerTable.$inferInsert

export const TrackerSchema = createSelectSchema(TrackerTable)

export const TrackerSchemaList = TrackerSchema.omit({ internalId: true, deletedAt: true })
export const TrackerSchemaGet = TrackerSchema.omit({ internalId: true })
