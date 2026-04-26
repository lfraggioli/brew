import { z } from 'zod';

export const v60Schema = z.object({
  method: z.literal('v60'),
  cups: z.number().int().min(1).max(3),
  ratio: z.number().min(15).max(17),
  temperature: z.number().min(90).max(96),
  grindSize: z.enum(['medium-fine', 'medium']),
  pourTechnique: z.enum(['continuous', 'pulse']),
});
