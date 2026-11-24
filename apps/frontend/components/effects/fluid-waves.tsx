'use client';

import { useState } from 'react';
import { DitherField } from '@/components/effects/dither-field';
import {
  GlCanvas,
  type EffectIntensity,
  type IntensityProfile,
} from '@/components/effects/gl-canvas';
import { useEffectsEnabled } from '@/lib/context/effects-context';
import { FLUID_WAVES_FRAGMENT, FLUID_WAVES_TOKENS } from '@/lib/effects/shaders/fluid-waves';
import { cn } from '@/lib/utils';

const FPS = 24;

const PROFILES: Record<EffectIntensity, IntensityProfile> = {
  idle: { speed: 1, level: 0.82 },
  active: { speed: 1, level: 1 },
};

/** Slow, ambient 221 contour waves that flow independently of pointer input. */
export function FluidWaves({
  className,
  intensity = 'idle',
}: {
  className?: string;
  intensity?: EffectIntensity;
}) {
  const enabled = useEffectsEnabled();
  const [failed, setFailed] = useState(false);
  if (!enabled) return null;
  if (failed)
    return <DitherField className={cn('pointer-events-none absolute inset-0', className)} />;
  return (
    <GlCanvas
      className={cn('text-primary', className)}
      source={FLUID_WAVES_FRAGMENT}
      fps={FPS}
      maxDpr={1}
      tokens={FLUID_WAVES_TOKENS}
      profiles={PROFILES}
      intensity={intensity}
      onFail={() => setFailed(true)}
    />
  );
}
