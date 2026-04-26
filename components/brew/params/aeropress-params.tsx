'use client';

import { ParamSlider } from '@/components/ui/param-slider';
import { SegmentedControl } from '@/components/ui/segmented-control';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { grindLabels, formatTime } from '@/lib/format';
import type { AeropressConfig } from '@/lib/types';

type AeropressParamsProps = {
  config: AeropressConfig;
  onChange: (config: AeropressConfig) => void;
};

export function AeropressParams({ config, onChange }: AeropressParamsProps) {
  function patch(updates: Partial<Omit<AeropressConfig, 'method'>>) {
    onChange({ ...config, ...updates });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-sm">Método</Label>
        <SegmentedControl
          className="w-full"
          options={[
            { value: 'standard', label: 'Estándar' },
            { value: 'inverted', label: 'Invertido' },
          ]}
          value={config.style}
          onValueChange={(style) => patch({ style })}
        />
      </div>
      <ParamSlider
        label="Ratio"
        value={config.ratio}
        min={12}
        max={16}
        step={0.5}
        onValueChange={(ratio) => patch({ ratio })}
        formatValue={(v) => `1:${v}`}
      />
      <ParamSlider
        label="Temperatura"
        value={config.temperature}
        min={80}
        max={95}
        unit="°C"
        onValueChange={(temperature) => patch({ temperature })}
      />
      <div className="space-y-2">
        <Label className="text-sm">Molienda</Label>
        <Select
          value={config.grindSize}
          onValueChange={(val) =>
            patch({ grindSize: val as AeropressConfig['grindSize'] })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(['fine', 'medium-fine', 'medium'] as const).map((g) => (
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
        min={60}
        max={150}
        step={5}
        onValueChange={(immersionTime) => patch({ immersionTime })}
        formatValue={formatTime}
      />
    </div>
  );
}
