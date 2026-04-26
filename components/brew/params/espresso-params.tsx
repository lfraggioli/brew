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
import { grindLabels } from '@/lib/format';
import type { EspressoConfig } from '@/lib/types';

type EspressoParamsProps = {
  config: EspressoConfig;
  onChange: (config: EspressoConfig) => void;
};

export function EspressoParams({ config, onChange }: EspressoParamsProps) {
  function patch(updates: Partial<Omit<EspressoConfig, 'method'>>) {
    onChange({ ...config, ...updates });
  }

  return (
    <div className="space-y-5">
      <ParamSlider
        label="Dosis"
        value={config.dose}
        min={14}
        max={20}
        step={0.5}
        unit="g"
        onValueChange={(dose) => patch({ dose })}
      />
      <ParamSlider
        label="Ratio"
        value={config.ratio}
        min={1.5}
        max={2.5}
        step={0.1}
        onValueChange={(ratio) => patch({ ratio: Math.round(ratio * 10) / 10 })}
        formatValue={(v) => `1:${v}`}
      />
      <ParamSlider
        label="Temperatura"
        value={config.temperature}
        min={90}
        max={96}
        unit="°C"
        onValueChange={(temperature) => patch({ temperature })}
      />
      <div className="space-y-2">
        <Label className="text-sm">Molienda</Label>
        <Select
          value={config.grindSize}
          onValueChange={(val) =>
            patch({ grindSize: val as EspressoConfig['grindSize'] })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(['extra-fine', 'fine'] as const).map((g) => (
              <SelectItem key={g} value={g}>
                {grindLabels[g]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-sm">Pre-infusión</Label>
        <SegmentedControl
          className="w-full"
          options={[
            { value: 'off', label: 'No' },
            { value: 'on', label: 'Sí' },
          ]}
          value={config.preInfusion ? 'on' : 'off'}
          onValueChange={(v) => patch({ preInfusion: v === 'on' })}
        />
      </div>
    </div>
  );
}
