'use client';

import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

type ParamSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onValueChange: (value: number) => void;
  formatValue?: (value: number) => string;
};

export function ParamSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onValueChange,
  formatValue,
}: ParamSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <span className="text-sm font-medium tabular-nums text-foreground">
          {formatValue ? formatValue(value) : value}
          {unit && ` ${unit}`}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(val) => {
          const num = typeof val === 'number' ? val : val[0];
          onValueChange(num);
        }}
      />
    </div>
  );
}
