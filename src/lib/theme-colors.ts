import type { Theme } from '@/contexts/ThemeContext';

/**
 * 3D Scene color palettes for each theme
 * These are used in Three.js shaders and materials
 */

export interface ThemeColors {
  // Primary accent color (gold/indigo/sienna)
  primary: string;
  primaryHex: number;

  // Secondary accent (steel blue/slate/amber)
  secondary: string;
  secondaryHex: number;

  // Tertiary (purple nebula/light fog/warm brown)
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
  obsidian: {
    // Gold & Steel blue & Purple nebula
    primary: '#c9a87c',
    primaryHex: 0xc9a87c,
    secondary: '#8b9dc3',
    secondaryHex: 0x8b9dc3,
    tertiary: '#7c3aed',
    tertiaryHex: 0x7c3aed,

    // Near-black backgrounds
    backgroundStart: '#0a0a0f',
    backgroundStartHex: 0x0a0a0f,
    backgroundEnd: '#12121a',
    backgroundEndHex: 0x12121a,

    // Particle colors - warm gold and cool blue
    particlePrimary: '#e8c4a0',
    particlePrimaryHex: 0xe8c4a0,
    particleSecondary: '#aab8d8',
    particleSecondaryHex: 0xaab8d8,

    glowIntensity: 1.0,

    fogColor: '#0a0a0f',
    fogColorHex: 0x0a0a0f,
    fogNear: 15,
    fogFar: 50,
  },

  alabaster: {
    // Indigo & Slate & Light fog
    primary: '#5a67d8',
    primaryHex: 0x5a67d8,
    secondary: '#4a5568',
    secondaryHex: 0x4a5568,
    tertiary: '#a0aec0',
    tertiaryHex: 0xa0aec0,

    // Light backgrounds
    backgroundStart: '#fafafa',
    backgroundStartHex: 0xfafafa,
    backgroundEnd: '#f0f0f0',
    backgroundEndHex: 0xf0f0f0,

    // Particle colors - subtle indigo tints
    particlePrimary: '#818cf8',
    particlePrimaryHex: 0x818cf8,
    particleSecondary: '#94a3b8',
    particleSecondaryHex: 0x94a3b8,

    glowIntensity: 0.5,

    fogColor: '#fafafa',
    fogColorHex: 0xfafafa,
    fogNear: 20,
    fogFar: 60,
  },

  dusk: {
    // Sienna & Amber & Warm brown
    primary: '#c2410c',
    primaryHex: 0xc2410c,
    secondary: '#a16207',
    secondaryHex: 0xa16207,
    tertiary: '#78350f',
    tertiaryHex: 0x78350f,

    // Warm dark backgrounds
    backgroundStart: '#1c1917',
    backgroundStartHex: 0x1c1917,
    backgroundEnd: '#26221f',
    backgroundEndHex: 0x26221f,

    // Particle colors - warm embers
    particlePrimary: '#fb923c',
    particlePrimaryHex: 0xfb923c,
    particleSecondary: '#fbbf24',
    particleSecondaryHex: 0xfbbf24,

    glowIntensity: 0.8,

    fogColor: '#1c1917',
    fogColorHex: 0x1c1917,
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
