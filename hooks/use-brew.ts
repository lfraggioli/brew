'use client';

import { useReducer, useMemo, useCallback } from 'react';
import { brewConfigSchema } from '@/lib/schemas/brew-config';
import { calculate } from '@/lib/calc/brew-calculator';
import { getDefaults, getSteps } from '@/lib/recipes';
import type { BrewConfig, BrewMethod, BrewResult, RecipeStep } from '@/lib/types';

type BrewState = {
  config: BrewConfig;
};

type BrewAction =
  | { type: 'SELECT_METHOD'; method: BrewMethod }
  | { type: 'UPDATE_CONFIG'; config: BrewConfig };

function brewReducer(state: BrewState, action: BrewAction): BrewState {
  switch (action.type) {
    case 'SELECT_METHOD':
      return { config: getDefaults(action.method) };

    case 'UPDATE_CONFIG': {
      const parsed = brewConfigSchema.safeParse(action.config);
      return parsed.success ? { config: parsed.data } : state;
    }
  }
}

export function useBrew(initialMethod: BrewMethod = 'v60') {
  const [state, dispatch] = useReducer(brewReducer, {
    config: getDefaults(initialMethod),
  });

  const result: BrewResult = useMemo(
    () => calculate(state.config),
    [state.config],
  );

  const steps: RecipeStep[] = useMemo(
    () => getSteps(state.config, result),
    [state.config, result],
  );

  const selectMethod = useCallback((method: BrewMethod) => {
    dispatch({ type: 'SELECT_METHOD', method });
  }, []);

  const updateConfig = useCallback((config: BrewConfig) => {
    dispatch({ type: 'UPDATE_CONFIG', config });
  }, []);

  return {
    method: state.config.method,
    config: state.config,
    result,
    steps,
    selectMethod,
    updateConfig,
  } as const;
}
