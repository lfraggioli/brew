import type { z } from 'zod';
import type {
  brewConfigSchema,
  brewMethodSchema,
  v60Schema,
  aeropressSchema,
  frenchPressSchema,
  espressoSchema,
} from './schemas/brew-config';

export type BrewMethod = z.infer<typeof brewMethodSchema>;
export type BrewConfig = z.infer<typeof brewConfigSchema>;
export type V60Config = z.infer<typeof v60Schema>;
export type AeropressConfig = z.infer<typeof aeropressSchema>;
export type FrenchPressConfig = z.infer<typeof frenchPressSchema>;
export type EspressoConfig = z.infer<typeof espressoSchema>;

export type RecipeStep = {
  title: string;
  description: string;
  duration: number | null;
};

export type BrewResult = {
  coffeeGrams: number;
  waterGrams: number;
  totalTime: number;
};

export type MethodMeta = {
  id: BrewMethod;
  name: string;
  description: string;
};
