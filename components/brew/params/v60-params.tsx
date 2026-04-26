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
import type { V60Config } from '@/lib/types';

type V60ParamsProps = {
  config: V60Config;
  onChange: (config: V60Config) => void;
};

export function V60Params({ config, onChange }: V60ParamsProps) {
  function patch(updates: Partial<Omit<V60Config, 'method'>>) {
    onChange({ ...config, ...updates });
  }

  return (
    <div className="space-y-5">
      <ParamSlider
        label="Tazas"
        value={config.cups}
        min={1}
        max={3}
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
        min={90}
        max={96}
        unit="°C"
        onValueChange={(temperature) => patch({ temperature })}
      />
      <div className="space-y-2">
        <Label className="text-sm">Molienda</Label>
        <Select
          value={config.grindSize}
          onValueChange={(val) => patch({ grindSize: val as V60Config['grindSize'] })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(['medium-fine', 'medium'] as const).map((g) => (
              <SelectItem key={g} value={g}>
                {grindLabels[g]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-sm">Técnica de vertido</Label>
        <SegmentedControl
          className="w-full"
          options={[
            { value: 'pulse', label: 'Pulsos' },
            { value: 'continuous', label: 'Continuo' },
          ]}
          value={config.pourTechnique}
          onValueChange={(pourTechnique) => patch({ pourTechnique })}
        />
      </div>
    </div>
  );
}
