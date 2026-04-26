import { z } from 'zod';
import { v60Schema } from './v60';
import { aeropressSchema } from './aeropress';
import { frenchPressSchema } from './french-press';
import { espressoSchema } from './espresso';

export const brewConfigSchema = z.discriminatedUnion('method', [
  v60Schema,
  aeropressSchema,
  frenchPressSchema,
  espressoSchema,
]);

export const brewMethodSchema = z.enum([
  'v60',
  'aeropress',
  'frenchpress',
  'espresso',
]);

export { v60Schema, aeropressSchema, frenchPressSchema, espressoSchema };
