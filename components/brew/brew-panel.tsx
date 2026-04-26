'use client';

import { LayoutGroup } from 'framer-motion';
import { useBrew } from '@/hooks/use-brew';
import { MethodSelector } from '@/components/brew/method-selector';
import { ConfigPanel } from '@/components/brew/config-panel';
import { BrewSummary } from '@/components/brew/brew-summary';
import { RecipeSteps } from '@/components/brew/recipe-steps';

export function BrewPanel() {
  const { method, config, result, steps, selectMethod, updateConfig } =
    useBrew();

  return (
    <LayoutGroup>
      <div className="space-y-8">
        <MethodSelector selected={method} onSelect={selectMethod} />

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-semibold">Configuración</h2>
              <ConfigPanel config={config} onChange={updateConfig} />
            </div>
            <BrewSummary result={result} />
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Receta</h2>
            <RecipeSteps steps={steps} />
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
}
