import type { InferSelectModel } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import z from 'zod'
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

export const TrackerSelectSchema = createSelectSchema(TrackerTable)
export const TrackerInsertSchema = createInsertSchema(TrackerTable, {
  color: z.string().regex(/^#[0-9a-f]{6,8}$/i).default('#000000'),
})

export const TrackerSchemaList = TrackerSelectSchema.omit({ internalId: true, deletedAt: true })
export const TrackerSchemaGet = TrackerSelectSchema.omit({ internalId: true })
export const TrackerSchemaPost = TrackerInsertSchema.omit({ id: true, deletedAt: true, createdAt: true, updatedAt: true }).strict()
