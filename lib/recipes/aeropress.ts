import type { AeropressConfig, MethodMeta, RecipeStep, BrewResult } from '@/lib/types';

export const meta: MethodMeta = {
  id: 'aeropress',
  name: 'Aeropress',
  description: 'Versátil y portátil. Café con cuerpo, limpio y con baja acidez.',
};

export const defaults: AeropressConfig = {
  method: 'aeropress',
  style: 'standard',
  ratio: 14,
  temperature: 85,
  grindSize: 'medium-fine',
  immersionTime: 90,
};

export function getSteps(config: AeropressConfig, result: BrewResult): RecipeStep[] {
  if (config.style === 'inverted') {
    return [
      {
        title: 'Preparar invertido',
        description: 'Colocá el émbolo en el cilindro e invertí el Aeropress. Que quede estable.',
        duration: null,
      },
      {
        title: 'Agregar café',
        description: `Agregá ${result.coffeeGrams}g de café molido ${config.grindSize === 'fine' ? 'fino' : config.grindSize === 'medium' ? 'medio' : 'medio-fino'}.`,
        duration: null,
      },
      {
        title: 'Agregar agua',
        description: `Vertí ${result.waterGrams}g de agua a ${config.temperature}°C. Revolvé suavemente.`,
        duration: 10,
      },
      {
        title: 'Inmersión',
        description: 'Dejá reposar el café. No toques nada.',
        duration: config.immersionTime,
      },
      {
        title: 'Invertir y prensar',
        description: 'Colocá el filtro húmedo en el cap, enroscá, invertí sobre la taza y presioná lento y parejo.',
        duration: 30,
      },
    ];
  }

  return [
    {
      title: 'Preparar filtro',
      description: 'Colocá el filtro de papel en el cap, enjuagalo y enroscalo en el cilindro sobre la taza.',
      duration: null,
    },
    {
      title: 'Agregar café',
      description: `Agregá ${result.coffeeGrams}g de café molido ${config.grindSize === 'fine' ? 'fino' : config.grindSize === 'medium' ? 'medio' : 'medio-fino'}.`,
      duration: null,
    },
    {
      title: 'Agregar agua',
      description: `Vertí ${result.waterGrams}g de agua a ${config.temperature}°C. Revolvé suavemente.`,
      duration: 10,
    },
    {
      title: 'Inmersión',
      description: 'Insertá el émbolo para crear sello y esperá.',
      duration: config.immersionTime,
    },
    {
      title: 'Prensar',
      description: 'Presioná el émbolo lento y parejo durante 30 segundos.',
      duration: 30,
    },
  ];
}
