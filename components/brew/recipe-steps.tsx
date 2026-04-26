'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { formatTime } from '@/lib/format';
import type { RecipeStep } from '@/lib/types';

type RecipeStepsProps = {
  steps: RecipeStep[];
};

export function RecipeSteps({ steps }: RecipeStepsProps) {
  return (
    <ol className="space-y-3">
      <AnimatePresence mode="popLayout">
        {steps.map((step, i) => (
          <motion.li
            key={`${step.title}-${i}`}
            layout
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            className="flex gap-3"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{step.title}</p>
                {step.duration !== null && (
                  <Badge variant="secondary" className="text-xs tabular-nums">
                    {formatTime(step.duration)}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ol>
  );
}
