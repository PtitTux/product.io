import type { DrizzleInstancePg } from 'plugins/drizzle'
import type { TrackerType } from 'repositories/models/trackers'
import { eq } from 'drizzle-orm'
import { TrackerSchema } from 'repositories/models/trackers'

export async function findByExternalId(drizzle: DrizzleInstancePg, externalId: string): Promise<TrackerType | null> {
  const trackers = await drizzle
    .select()
    .from(TrackerSchema)
    .where(eq(TrackerSchema.externalId, externalId))

  return trackers.length > 0 ? trackers[0] : null
}
