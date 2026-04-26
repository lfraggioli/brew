'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { allMeta } from '@/lib/recipes';
import type { BrewMethod } from '@/lib/types';

type MethodSelectorProps = {
  selected: BrewMethod;
  onSelect: (method: BrewMethod) => void;
};

export function MethodSelector({ selected, onSelect }: MethodSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {allMeta.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => onSelect(method.id)}
          className="text-left"
        >
          <Card
            className={cn(
              'relative cursor-pointer transition-colors hover:bg-accent/50',
              selected === method.id && 'ring-2 ring-primary',
            )}
            size="sm"
          >
            {selected === method.id && (
              <motion.div
                layoutId="method-indicator"
                className="absolute inset-0 rounded-xl ring-2 ring-primary"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <CardHeader>
              <CardTitle>{method.name}</CardTitle>
              <CardDescription className="line-clamp-2 text-xs">
                {method.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </button>
      ))}
    </div>
  );
}
