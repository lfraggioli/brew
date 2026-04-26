import type { EspressoConfig, MethodMeta, RecipeStep, BrewResult } from '@/lib/types';

export const meta: MethodMeta = {
  id: 'espresso',
  name: 'Espresso',
  description: 'Presión a 9 bar. Concentrado, intenso, con crema. La base de todo.',
};

export const defaults: EspressoConfig = {
  method: 'espresso',
  dose: 18,
  ratio: 2,
  temperature: 93,
  grindSize: 'extra-fine',
  preInfusion: false,
};

export function getSteps(config: EspressoConfig, result: BrewResult): RecipeStep[] {
  const steps: RecipeStep[] = [
    {
      title: 'Moler y dosar',
      description: `Molé ${result.coffeeGrams}g de café extra fino. Distribuí parejo en el portafiltro.`,
      duration: null,
    },
    {
      title: 'Tampar',
      description: 'Presioná con el tamper de forma nivelada y firme (~15kg de presión).',
      duration: null,
    },
  ];

  if (config.preInfusion) {
    steps.push({
      title: 'Pre-infusión',
      description: 'Activá el flujo a baja presión para saturar el café antes de la extracción completa.',
      duration: 5,
    });
  }

  steps.push({
    title: 'Extracción',
    description: `Extraé ${result.waterGrams}g de espresso a ${config.temperature}°C y 9 bar de presión.`,
    duration: 27,
  });

  return steps;
}
