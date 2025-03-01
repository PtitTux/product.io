import z from 'zod'

export const ErrorSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  details: z.object(
    {
      issues: z.unknown(),
      method: z.enum(['POST', 'GET', 'PUT', 'DELETE']),
      url: z.string(),
    },
  ).optional(),
})
