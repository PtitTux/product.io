import type { TrackerType } from '#Models/trackers'
import type { DrizzleInstancePg } from '#Plugins/drizzle'
import { TrackerTable } from '#Models/trackers'
import { isNull } from 'drizzle-orm'

export async function findAll(drizzle: DrizzleInstancePg): Promise<TrackerType[]> {
  return drizzle
    .select()
    .from(TrackerTable)
    .where(isNull(TrackerTable.deletedAt))
}
