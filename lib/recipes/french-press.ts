import type { FrenchPressConfig, MethodMeta, RecipeStep, BrewResult } from '@/lib/types';

export const meta: MethodMeta = {
  id: 'frenchpress',
  name: 'French Press',
  description: 'Inmersión total. Café con cuerpo denso, textura rica y sabor intenso.',
};

export const defaults: FrenchPressConfig = {
  method: 'frenchpress',
  cups: 2,
  ratio: 16,
  temperature: 95,
  grindSize: 'coarse',
  immersionTime: 240,
};

export function getSteps(config: FrenchPressConfig, result: BrewResult): RecipeStep[] {
  return [
    {
      title: 'Precalentar',
      description: 'Llená la prensa con agua caliente para precalentarla. Descartá el agua.',
      duration: null,
    },
    {
      title: 'Agregar café',
      description: `Agregá ${result.coffeeGrams}g de café molido grueso.`,
      duration: null,
    },
    {
      title: 'Agregar agua',
      description: `Vertí ${result.waterGrams}g de agua a ${config.temperature}°C. Asegurate de mojar todo el café.`,
      duration: 10,
    },
    {
      title: 'Revolver',
      description: 'Revolvé suavemente con una cuchara para romper la costra.',
      duration: null,
    },
    {
      title: 'Inmersión',
      description: 'Colocá la tapa sin presionar el émbolo. Dejá reposar.',
      duration: config.immersionTime,
    },
    {
      title: 'Prensar',
      description: 'Presioná el émbolo lento y parejo hasta el fondo.',
      duration: 15,
    },
    {
      title: 'Servir',
      description: 'Serví inmediatamente. No dejes el café en la prensa — se sigue extrayendo.',
      duration: null,
    },
  ];
}
