'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatTime } from '@/lib/format';
import type { BrewResult } from '@/lib/types';

type BrewSummaryProps = {
  result: BrewResult;
};

const item = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0 },
};

export function BrewSummary({ result }: BrewSummaryProps) {
  return (
    <Card>
      <CardContent>
        <motion.div
          className="flex items-center justify-around text-center"
          variants={{
            show: { transition: { staggerChildren: 0.05 } },
          }}
          initial="hidden"
          animate="show"
          key={`${result.coffeeGrams}-${result.waterGrams}-${result.totalTime}`}
        >
          <motion.div variants={item}>
            <p className="text-2xl font-semibold tabular-nums">
              {result.coffeeGrams}g
            </p>
            <p className="text-xs text-muted-foreground">Café</p>
          </motion.div>
          <Separator orientation="vertical" className="h-10" />
          <motion.div variants={item}>
            <p className="text-2xl font-semibold tabular-nums">
              {result.waterGrams}g
            </p>
            <p className="text-xs text-muted-foreground">Agua</p>
          </motion.div>
          <Separator orientation="vertical" className="h-10" />
          <motion.div variants={item}>
            <p className="text-2xl font-semibold tabular-nums">
              {formatTime(result.totalTime)}
            </p>
            <p className="text-xs text-muted-foreground">Tiempo</p>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
