import type { TrackerType } from '#Models/trackers'
import type { DrizzleInstancePg } from '#Plugins/drizzle'
import { TrackerTable } from '#Models/trackers'
import { eq } from 'drizzle-orm'

export async function findById(drizzle: DrizzleInstancePg, id: string): Promise<TrackerType | undefined> {
  const trackers = await drizzle
    .select()
    .from(TrackerTable)
    .where(eq(TrackerTable.id, id))

  return trackers[0]
}
