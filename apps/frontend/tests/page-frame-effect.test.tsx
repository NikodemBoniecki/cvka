import { Suspense, lazy, type ComponentType } from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BackgroundEffect } from '@/components/effects/background-effect';
import { PageFrame } from '@/components/ui/page-frame';
import { EffectsProvider } from '@/lib/context/effects-context';

// Make the lazy boundary real but in-process: the loader resolves, the component renders.
vi.mock('next/dynamic', () => ({
  default: (loader: () => Promise<ComponentType<Record<string, unknown>>>) => {
    const Lazy = lazy(async () => ({ default: await loader() }));
    return function Dynamic(props: Record<string, unknown>) {
      return (
        <Suspense fallback={null}>
          <Lazy {...props} />
        </Suspense>
      );
    };
  },
}));

// Stand in for the GL effects: only which one renders, and with what, matters here.
vi.mock('@/components/effects/pixel-beams', () => ({
  PixelBeams: ({ className, intensity }: { className?: string; intensity?: string }) => (
    <div data-testid="pixel-beams" data-intensity={intensity} className={className} />
  ),
}));
vi.mock('@/components/effects/retro-bitrate', () => ({
  RetroBitrate: ({ className, intensity }: { className?: string; intensity?: string }) => (
    <div data-testid="retro-bitrate" data-intensity={intensity} className={className} />
  ),
}));
vi.mock('@/components/effects/fluid-waves', () => ({
  FluidWaves: ({ className, intensity }: { className?: string; intensity?: string }) => (
    <div data-testid="fluid-waves" data-intensity={intensity} className={className} />
  ),
}));

beforeEach(() => localStorage.clear());

const framed = (props: Parameters<typeof PageFrame>[0]) => (
  <EffectsProvider>
    <PageFrame {...props} />
  </EffectsProvider>
);

describe('PageFrame effect prop', () => {
  it('defaults to cursor-reactive 221 waves, idle, fixed to one screen behind the frame', async () => {
    const { container } = render(framed({ children: <p>content</p> }));
    const waves = await screen.findByTestId('fluid-waves');
    expect(waves).toHaveAttribute('data-intensity', 'idle');
    expect(waves).toHaveClass('fixed', 'inset-0', 'z-0', 'h-full', 'w-full');
    expect(waves.parentElement).toBe(container.firstChild);
    expect(screen.queryByTestId('retro-bitrate')).toBeNull();
  });

  it('effect="bitrate" renders Retro Bitrate instead of the waves, at the given intensity', async () => {
    render(framed({ effect: 'bitrate', effectIntensity: 'active', children: <p>content</p> }));
    const bitrate = await screen.findByTestId('retro-bitrate');
    expect(bitrate).toHaveAttribute('data-intensity', 'active');
    expect(bitrate).toHaveClass('fixed', 'inset-0', 'z-0', 'h-full', 'w-full');
    expect(screen.queryByTestId('fluid-waves')).toBeNull();
  });

  it('effect="bitrate" is idle unless told otherwise', async () => {
    render(framed({ effect: 'bitrate', children: <p>content</p> }));
    expect(await screen.findByTestId('retro-bitrate')).toHaveAttribute('data-intensity', 'idle');
  });

  it('effect="none" renders neither', async () => {
    const { container } = render(framed({ effect: 'none', children: <p>content</p> }));
    await screen.findByText('content');
    expect(screen.queryByTestId('pixel-beams')).toBeNull();
    expect(screen.queryByTestId('fluid-waves')).toBeNull();
    expect(screen.queryByTestId('retro-bitrate')).toBeNull();
    expect(container.firstChild).toHaveClass('bg-canvas');
  });

  it('keeps the frame opaque and the page on plain Canvas whichever effect sits behind', async () => {
    render(framed({ effect: 'bitrate', children: <p>content</p> }));
    await screen.findByTestId('retro-bitrate');
    expect(screen.getByText('content').parentElement).toHaveClass('bg-canvas', 'border-ink');
  });

  it('renders no effect when background effects are off', async () => {
    localStorage.setItem('resume_matcher_effects', 'false');
    for (const effect of ['waves', 'beams', 'bitrate'] as const) {
      const { container, unmount } = render(framed({ effect, children: <p>content</p> }));
      await screen.findByText('content');
      expect(container.querySelector('[data-testid]')).toBeNull();
      unmount();
    }
  });
});

describe('BackgroundEffect', () => {
  it('renders nothing outside an effects provider (print routes, isolated tests)', () => {
    const { container } = render(<BackgroundEffect effect="bitrate" intensity="active" />);
    expect(container.firstChild).toBeNull();
  });

  it('passes the intensity through and follows it as it changes', async () => {
    const { rerender } = render(
      <EffectsProvider>
        <BackgroundEffect effect="bitrate" intensity="idle" />
      </EffectsProvider>
    );
    expect(await screen.findByTestId('retro-bitrate')).toHaveAttribute('data-intensity', 'idle');
    const same = screen.getByTestId('retro-bitrate');
    rerender(
      <EffectsProvider>
        <BackgroundEffect effect="bitrate" intensity="active" />
      </EffectsProvider>
    );
    // The same element: the effect is updated, not remounted (a remount would restart its WebGL context).
    expect(screen.getByTestId('retro-bitrate')).toBe(same);
    expect(same).toHaveAttribute('data-intensity', 'active');
  });
});
