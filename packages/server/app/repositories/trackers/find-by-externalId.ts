import type { TrackerType } from '#Models/trackers'
import type { DrizzleInstancePg } from '#Plugins/drizzle'
import { TrackerSchema } from '#Models/trackers'
import { eq } from 'drizzle-orm'

export async function findByExternalId(drizzle: DrizzleInstancePg, externalId: string): Promise<TrackerType | undefined> {
  const trackers = await drizzle
    .select()
    .from(TrackerSchema)
    .where(eq(TrackerSchema.externalId, externalId))

  return trackers[0]
}
