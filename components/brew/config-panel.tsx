'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { V60Params } from '@/components/brew/params/v60-params';
import { AeropressParams } from '@/components/brew/params/aeropress-params';
import { FrenchPressParams } from '@/components/brew/params/french-press-params';
import { EspressoParams } from '@/components/brew/params/espresso-params';
import type { BrewConfig } from '@/lib/types';

type ConfigPanelProps = {
  config: BrewConfig;
  onChange: (config: BrewConfig) => void;
};

export function ConfigPanel({ config, onChange }: ConfigPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={config.method}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        {renderParams(config, onChange)}
      </motion.div>
    </AnimatePresence>
  );
}

function renderParams(config: BrewConfig, onChange: (config: BrewConfig) => void) {
  switch (config.method) {
    case 'v60':
      return <V60Params config={config} onChange={onChange} />;
    case 'aeropress':
      return <AeropressParams config={config} onChange={onChange} />;
    case 'frenchpress':
      return <FrenchPressParams config={config} onChange={onChange} />;
    case 'espresso':
      return <EspressoParams config={config} onChange={onChange} />;
  }
}
