import { z } from 'zod';

export const aeropressSchema = z.object({
  method: z.literal('aeropress'),
  style: z.enum(['standard', 'inverted']),
  ratio: z.number().min(12).max(16),
  temperature: z.number().min(80).max(95),
  grindSize: z.enum(['fine', 'medium-fine', 'medium']),
  immersionTime: z.number().int().min(60).max(150),
});
