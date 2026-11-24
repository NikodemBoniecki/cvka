'use client';

import dynamic from 'next/dynamic';
import type { EffectIntensity } from '@/components/effects/gl-canvas';
import { useEffectsEnabled } from '@/lib/context/effects-context';

// A client wrapper: `dynamic(..., { ssr: false })` is not allowed in server components, and
// PageFrame is one. The effects load after first paint, so they never enter first-load JS.
const PixelBeams = dynamic(() => import('./pixel-beams').then((mod) => mod.PixelBeams), {
  ssr: false,
});
const RetroBitrate = dynamic(() => import('./retro-bitrate').then((mod) => mod.RetroBitrate), {
  ssr: false,
});
const FluidWaves = dynamic(() => import('./fluid-waves').then((mod) => mod.FluidWaves), {
  ssr: false,
});

/** `waves` is the cursor-reactive 221 page background; `bitrate` marks AI work. */
export type BackgroundEffectKind = 'beams' | 'bitrate' | 'waves' | 'none';

const FIXED = 'fixed inset-0 z-0 h-full w-full';

/**
 * The page background effect, behind its `relative isolate` parent. It is fixed to the viewport,
 * so it is always one screen however long the page is (the frame scrolls over it) and its cost
 * does not grow with the page. `intensity` is `idle` (slow, dim) or `active` (full). Renders
 * nothing when the user has turned background effects off (Settings), leaving the parent's plain
 * Canvas.
 */
export function BackgroundEffect({
  effect = 'waves',
  intensity = 'idle',
}: {
  effect?: BackgroundEffectKind;
  intensity?: EffectIntensity;
}) {
  const enabled = useEffectsEnabled();
  if (!enabled || effect === 'none') return null;
  if (effect === 'bitrate') return <RetroBitrate className={FIXED} intensity={intensity} />;
  if (effect === 'waves') return <FluidWaves className={FIXED} intensity={intensity} />;
  return <PixelBeams className={`${FIXED} text-steel`} intensity={intensity} />;
}
