import z from 'zod'

export type Project = z.infer<typeof ProjectSchema>

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  label: z.string(),
  group: z.string(),
  description: z.string(),
  color: z.string().regex(/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i).default('#000000'),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
})
