import type { V60Config, MethodMeta, RecipeStep, BrewResult } from '@/lib/types';

export const meta: MethodMeta = {
  id: 'v60',
  name: 'V60',
  description: 'Pour over clásico de Hario. Café limpio, brillante y con claridad de sabor.',
};

export const defaults: V60Config = {
  method: 'v60',
  cups: 1,
  ratio: 16,
  temperature: 93,
  grindSize: 'medium-fine',
  pourTechnique: 'pulse',
};

export function getSteps(config: V60Config, result: BrewResult): RecipeStep[] {
  const bloomWater = result.coffeeGrams * 2;
  const remainingWater = result.waterGrams - bloomWater;

  const base: RecipeStep[] = [
    {
      title: 'Preparar filtro',
      description: `Colocá el filtro en el V60 y enjuagalo con agua caliente. Descartá el agua.`,
      duration: null,
    },
    {
      title: 'Agregar café',
      description: `Agregá ${result.coffeeGrams}g de café molido medio-fino. Nivelá la cama.`,
      duration: null,
    },
    {
      title: 'Bloom',
      description: `Vertí ${bloomWater}g de agua a ${config.temperature}°C en círculos. Dejá desgasar.`,
      duration: 30,
    },
  ];

  if (config.pourTechnique === 'pulse') {
    const pulseCount = 3;
    const perPulse = Math.round(remainingWater / pulseCount);

    for (let i = 0; i < pulseCount; i++) {
      const pourAmount = i < pulseCount - 1 ? perPulse : remainingWater - perPulse * (pulseCount - 1);
      base.push({
        title: `Vertido ${i + 1}`,
        description: `Vertí ${pourAmount}g de agua en círculos concéntricos desde el centro.`,
        duration: 15,
      });

      if (i < pulseCount - 1) {
        base.push({
          title: `Pausa ${i + 1}`,
          description: 'Esperá a que baje el nivel de agua antes del siguiente vertido.',
          duration: 10,
        });
      }
    }
  } else {
    base.push({
      title: 'Vertido continuo',
      description: `Vertí ${remainingWater}g de agua en un flujo constante y circular.`,
      duration: 60,
    });
  }

  base.push({
    title: 'Drawdown',
    description: 'Esperá a que filtre toda el agua. El lecho de café debe quedar plano.',
    duration: 45,
  });

  return base;
}
