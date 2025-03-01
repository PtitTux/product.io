import type { TrackerInsert, TrackerType } from '#Models/trackers'
import type { DrizzleInstancePg } from '#Plugins/drizzle'
import { TrackerTable } from '#Models/trackers'

export async function create(drizzle: DrizzleInstancePg, tracker: TrackerInsert): Promise<TrackerType> {
  tracker.color = tracker.color ? tracker.color.toUpperCase() : undefined

  const inserted = await drizzle.insert(TrackerTable).values(tracker).returning()

  return inserted[0]
}
