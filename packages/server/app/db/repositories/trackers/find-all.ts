import type { TrackerType } from '#Models/trackers'
import type { DrizzleInstancePg } from '#Plugins/drizzle'
import { TrackerSchema } from '#Models/trackers'
import { isNull } from 'drizzle-orm'

export async function findAll(drizzle: DrizzleInstancePg): Promise<TrackerType[]> {
  const trackers = await drizzle
    .select()
    .from(TrackerSchema)
    .where(isNull(TrackerSchema.deletedAt))

  return trackers
}
