import type { Theme } from '@/contexts/ThemeContext';

/**
 * 3D Scene color palettes for each theme
 * These are used in Three.js shaders and materials
 *
 * Updated to match the $100M theme overhaul:
 * - Obsidian: Midnight Library (warm charcoal + gold)
 * - Alabaster: Editorial White (paper + indigo)
 * - Dusk: Candlelit Study (espresso + copper)
 */

export interface ThemeColors {
  // Primary accent color
  primary: string;
  primaryHex: number;

  // Secondary accent
  secondary: string;
  secondaryHex: number;

  // Tertiary accent
  tertiary: string;
  tertiaryHex: number;

  // Background colors for 3D scene
  backgroundStart: string;
  backgroundStartHex: number;
  backgroundEnd: string;
  backgroundEndHex: number;

  // Particle colors
  particlePrimary: string;
  particlePrimaryHex: number;
  particleSecondary: string;
  particleSecondaryHex: number;

  // Glow/emission intensity
  glowIntensity: number;

  // Fog settings
  fogColor: string;
  fogColorHex: number;
  fogNear: number;
  fogFar: number;
}

export const themeColors: Record<Theme, ThemeColors> = {
  // Obsidian - Midnight Library
  // Warm charcoal backgrounds, refined gold accents
  obsidian: {
    primary: '#d4b896',
    primaryHex: 0xd4b896,
    secondary: '#9ca3af',
    secondaryHex: 0x9ca3af,
    tertiary: '#a78bfa',
    tertiaryHex: 0xa78bfa,

    backgroundStart: '#0d0d0d',
    backgroundStartHex: 0x0d0d0d,
    backgroundEnd: '#141414',
    backgroundEndHex: 0x141414,

    // Particle colors - warm gold and soft steel
    particlePrimary: '#d4b896',
    particlePrimaryHex: 0xd4b896,
    particleSecondary: '#b9a07d',
    particleSecondaryHex: 0xb9a07d,

    glowIntensity: 0.8,

    fogColor: '#0d0d0d',
    fogColorHex: 0x0d0d0d,
    fogNear: 15,
    fogFar: 50,
  },

  // Alabaster - Editorial White
  // Warm paper whites, sophisticated indigo accents
  alabaster: {
    primary: '#4f46e5',
    primaryHex: 0x4f46e5,
    secondary: '#64748b',
    secondaryHex: 0x64748b,
    tertiary: '#6366f1',
    tertiaryHex: 0x6366f1,

    backgroundStart: '#fcfbf9',
    backgroundStartHex: 0xfcfbf9,
    backgroundEnd: '#f7f6f3',
    backgroundEndHex: 0xf7f6f3,

    // Particle colors - subtle indigo tints
    particlePrimary: '#818cf8',
    particlePrimaryHex: 0x818cf8,
    particleSecondary: '#a5b4fc',
    particleSecondaryHex: 0xa5b4fc,

    glowIntensity: 0.4,

    fogColor: '#fcfbf9',
    fogColorHex: 0xfcfbf9,
    fogNear: 20,
    fogFar: 60,
  },

  // Dusk - Candlelit Study
  // Rich espresso with purple undertone, copper/amber accents
  dusk: {
    primary: '#c9956c',
    primaryHex: 0xc9956c,
    secondary: '#d9af5f',
    secondaryHex: 0xd9af5f,
    tertiary: '#a78bfa',
    tertiaryHex: 0xa78bfa,

    backgroundStart: '#16141a',
    backgroundStartHex: 0x16141a,
    backgroundEnd: '#1e1c21',
    backgroundEndHex: 0x1e1c21,

    // Particle colors - warm copper and amber
    particlePrimary: '#c9956c',
    particlePrimaryHex: 0xc9956c,
    particleSecondary: '#d9af5f',
    particleSecondaryHex: 0xd9af5f,

    glowIntensity: 0.7,

    fogColor: '#16141a',
    fogColorHex: 0x16141a,
    fogNear: 15,
    fogFar: 45,
  },
};

/**
 * Get theme colors for current theme
 */
export function getThemeColors(theme: Theme): ThemeColors {
  return themeColors[theme];
}

/**
 * Convert hex string to THREE.js color format
 */
export function hexToVec3(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];

  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

/**
 * Interpolate between two colors
 */
export function lerpColor(color1: number, color2: number, t: number): number {
  const r1 = (color1 >> 16) & 0xff;
  const g1 = (color1 >> 8) & 0xff;
  const b1 = color1 & 0xff;

  const r2 = (color2 >> 16) & 0xff;
  const g2 = (color2 >> 8) & 0xff;
  const b2 = color2 & 0xff;

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return (r << 16) | (g << 8) | b;
}
