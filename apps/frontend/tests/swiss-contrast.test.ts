import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { THEME_COLOR } from '@/lib/theme-color';

const CSS = fs.readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../app/(default)/css/globals.css'),
  'utf8'
);

function token(name: string): string {
  const match = CSS.match(new RegExp(`--sw-${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
  if (!match) throw new Error(`--sw-${name} must be defined as a 6-digit hex in globals.css`);
  return match[1].toLowerCase();
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Text and text-on-fill pairs the black 221 UI actually uses. 4.5:1 each.
const TEXT_PAIRS: Array<[string, string]> = [
  ['ink-soft', 'canvas'],
  ['steel', 'canvas'],
  ['primary', 'canvas'],
  ['success', 'canvas'],
  ['destructive', 'canvas'],
  ['warning-text', 'canvas'],
  ['on-accent', 'primary'],
  ['on-accent', 'success'],
  ['on-accent', 'warning'],
  ['on-accent', 'highlight'],
  ['on-accent', 'destructive'],
  ['ink', 'canvas'],
];

// Non-text graphics that carry meaning on their own (SC 1.4.11). 3:1 each.
const GRAPHIC_PAIRS: Array<[string, string]> = [
  ['primary', 'canvas'],
  ['success', 'canvas'],
  ['destructive', 'canvas'],
  ['ink', 'canvas'],
];

describe('221 palette contrast (WCAG 2.2 AA)', () => {
  it.each(TEXT_PAIRS)('%s text on %s is at least 4.5:1', (fg, bg) => {
    expect(contrast(token(fg), token(bg))).toBeGreaterThanOrEqual(4.5);
  });

  it.each(GRAPHIC_PAIRS)('%s graphic on %s is at least 3:1', (fg, bg) => {
    expect(contrast(token(fg), token(bg))).toBeGreaterThanOrEqual(3);
  });

  it('pins the warning fill, which is exempt from 1.4.11 because it never carries meaning alone', () => {
    // Warning states carry a visible label and use black text on the orange fill.
    expect(token('warning')).toBe('#ff751f');
    expect(contrast(token('on-accent'), token('warning'))).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps secondary text readable on the black panel', () => {
    expect(contrast(token('steel'), token('panel'))).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps the browser theme colour in sync with canvas', () => {
    expect(THEME_COLOR.toLowerCase()).toBe(token('canvas'));
  });
});
