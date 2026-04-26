import type { BrewConfig, BrewMethod, BrewResult, MethodMeta, RecipeStep } from '@/lib/types';

import * as v60 from './v60';
import * as aeropress from './aeropress';
import * as frenchPress from './french-press';
import * as espresso from './espresso';

type MethodModule<T extends BrewConfig = BrewConfig> = {
  meta: MethodMeta;
  defaults: T;
  getSteps: (config: T, result: BrewResult) => RecipeStep[];
};

const registry = {
  v60,
  aeropress,
  frenchpress: frenchPress,
  espresso,
} as const;

export function getMeta(method: BrewMethod): MethodMeta {
  return registry[method].meta;
}

export function getDefaults(method: BrewMethod): BrewConfig {
  return registry[method].defaults;
}

export function getSteps(config: BrewConfig, result: BrewResult): RecipeStep[] {
  switch (config.method) {
    case 'v60':
      return v60.getSteps(config, result);
    case 'aeropress':
      return aeropress.getSteps(config, result);
    case 'frenchpress':
      return frenchPress.getSteps(config, result);
    case 'espresso':
      return espresso.getSteps(config, result);
  }
}

export const allMethods: BrewMethod[] = ['v60', 'aeropress', 'frenchpress', 'espresso'];
export const allMeta: MethodMeta[] = allMethods.map(getMeta);
