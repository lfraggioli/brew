'use client';

import { ParamSlider } from '@/components/ui/param-slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { grindLabels, formatTime } from '@/lib/format';
import type { FrenchPressConfig } from '@/lib/types';

type FrenchPressParamsProps = {
  config: FrenchPressConfig;
  onChange: (config: FrenchPressConfig) => void;
};

export function FrenchPressParams({ config, onChange }: FrenchPressParamsProps) {
  function patch(updates: Partial<Omit<FrenchPressConfig, 'method'>>) {
    onChange({ ...config, ...updates });
  }

  return (
    <div className="space-y-5">
      <ParamSlider
        label="Tazas"
        value={config.cups}
        min={1}
        max={8}
        onValueChange={(cups) => patch({ cups })}
      />
      <ParamSlider
        label="Ratio"
        value={config.ratio}
        min={15}
        max={17}
        step={0.5}
        onValueChange={(ratio) => patch({ ratio })}
        formatValue={(v) => `1:${v}`}
      />
      <ParamSlider
        label="Temperatura"
        value={config.temperature}
        min={93}
        max={96}
        unit="°C"
        onValueChange={(temperature) => patch({ temperature })}
      />
      <div className="space-y-2">
        <Label className="text-sm">Molienda</Label>
        <Select
          value={config.grindSize}
          onValueChange={(val) =>
            patch({ grindSize: val as FrenchPressConfig['grindSize'] })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(['medium-coarse', 'coarse'] as const).map((g) => (
              <SelectItem key={g} value={g}>
                {grindLabels[g]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ParamSlider
        label="Tiempo de inmersión"
        value={config.immersionTime}
        min={180}
        max={300}
        step={10}
        onValueChange={(immersionTime) => patch({ immersionTime })}
        formatValue={formatTime}
      />
    </div>
  );
}
