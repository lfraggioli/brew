import { z } from 'zod';

export const frenchPressSchema = z.object({
  method: z.literal('frenchpress'),
  cups: z.number().int().min(1).max(8),
  ratio: z.number().min(15).max(17),
  temperature: z.number().min(93).max(96),
  grindSize: z.enum(['medium-coarse', 'coarse']),
  immersionTime: z.number().int().min(180).max(300),
});
