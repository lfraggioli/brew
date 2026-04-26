import type {
  BrewConfig,
  BrewResult,
  V60Config,
  AeropressConfig,
  FrenchPressConfig,
  EspressoConfig,
} from '@/lib/types';

const GRAMS_PER_CUP = 15;
const AEROPRESS_DOSE = 15;

export function calculate(config: BrewConfig): BrewResult {
  switch (config.method) {
    case 'v60':
      return calculateV60(config);
    case 'aeropress':
      return calculateAeropress(config);
    case 'frenchpress':
      return calculateFrenchPress(config);
    case 'espresso':
      return calculateEspresso(config);
  }
}

function calculateV60(config: V60Config): BrewResult {
  const coffeeGrams = config.cups * GRAMS_PER_CUP;
  const waterGrams = Math.round(coffeeGrams * config.ratio);

  const totalTime =
    config.pourTechnique === 'pulse'
      ? 30 + 3 * 15 + 2 * 10 + 45
      : 30 + 60 + 45;

  return { coffeeGrams, waterGrams, totalTime };
}

function calculateAeropress(config: AeropressConfig): BrewResult {
  const coffeeGrams = AEROPRESS_DOSE;
  const waterGrams = Math.round(coffeeGrams * config.ratio);
  const totalTime = 10 + config.immersionTime + 30;

  return { coffeeGrams, waterGrams, totalTime };
}

function calculateFrenchPress(config: FrenchPressConfig): BrewResult {
  const coffeeGrams = config.cups * GRAMS_PER_CUP;
  const waterGrams = Math.round(coffeeGrams * config.ratio);
  const totalTime = 10 + config.immersionTime + 15;

  return { coffeeGrams, waterGrams, totalTime };
}

function calculateEspresso(config: EspressoConfig): BrewResult {
  const coffeeGrams = config.dose;
  const waterGrams = Math.round(coffeeGrams * config.ratio);
  const totalTime = (config.preInfusion ? 5 : 0) + 27;

  return { coffeeGrams, waterGrams, totalTime };
}
