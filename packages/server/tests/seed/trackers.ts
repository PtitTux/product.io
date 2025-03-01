import type { DrizzleInstancePg } from '#Plugins/drizzle'
import { type TrackerInsert, TrackerTable } from '#Models/trackers'
import { faker } from '@faker-js/faker'

export async function seedTrackers(drizzle: DrizzleInstancePg) {
  const datas: TrackerInsert[] = []

  // Reset datas
  await drizzle.delete(TrackerTable)

  for (let i = 0; i < 30; i++) {
    datas.push({
      name: faker.commerce.product(),
      label: faker.commerce.productName(),
      color: faker.color.rgb(),
      description: faker.commerce.productDescription(),
    })
  }

  await drizzle.insert(TrackerTable).values(datas)
}
