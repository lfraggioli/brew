import { z } from 'zod';

export const espressoSchema = z.object({
  method: z.literal('espresso'),
  dose: z.number().min(14).max(20),
  ratio: z.number().min(1.5).max(2.5),
  temperature: z.number().min(90).max(96),
  grindSize: z.enum(['extra-fine', 'fine']),
  preInfusion: z.boolean(),
});
