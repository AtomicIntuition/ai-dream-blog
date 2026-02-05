import type { Theme } from '@/contexts/ThemeContext';

/**
 * 3D Scene color palettes for each theme
 * These are used in Three.js shaders and materials
 *
 * - Obsidian: Cosmic Void (cool blue-black + electric cyan/purple)
 * - Alabaster: The Studio (warm paper + royal blue)
 * - Dusk: The Hearth (warm brown-black + vivid amber/orange)
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
  // Obsidian - Cosmic Void
  // Cool blue-black void, electric cyan/purple accents
  obsidian: {
    primary: '#38bdf8',
    primaryHex: 0x38bdf8,
    secondary: '#6366f1',
    secondaryHex: 0x6366f1,
    tertiary: '#a855f7',
    tertiaryHex: 0xa855f7,

    backgroundStart: '#0a0a10',
    backgroundStartHex: 0x0a0a10,
    backgroundEnd: '#101018',
    backgroundEndHex: 0x101018,

    // Particle colors - electric cyan and purple
    particlePrimary: '#38bdf8',
    particlePrimaryHex: 0x38bdf8,
    particleSecondary: '#a855f7',
    particleSecondaryHex: 0xa855f7,

    glowIntensity: 0.9,

    fogColor: '#0a0a10',
    fogColorHex: 0x0a0a10,
    fogNear: 15,
    fogFar: 50,
  },

  // Alabaster - The Studio
  // Warm paper whites, vivid royal blue accents
  alabaster: {
    primary: '#2563eb',
    primaryHex: 0x2563eb,
    secondary: '#3b82f6',
    secondaryHex: 0x3b82f6,
    tertiary: '#64748b',
    tertiaryHex: 0x64748b,

    backgroundStart: '#faf9f6',
    backgroundStartHex: 0xfaf9f6,
    backgroundEnd: '#f4f2ee',
    backgroundEndHex: 0xf4f2ee,

    // Particle colors - soft blue tints
    particlePrimary: '#60a5fa',
    particlePrimaryHex: 0x60a5fa,
    particleSecondary: '#93c5fd',
    particleSecondaryHex: 0x93c5fd,

    glowIntensity: 0.4,

    fogColor: '#faf9f6',
    fogColorHex: 0xfaf9f6,
    fogNear: 20,
    fogFar: 60,
  },

  // Dusk - The Hearth
  // Deep warm brown-blacks, vivid amber/orange accents
  dusk: {
    primary: '#f59e0b',
    primaryHex: 0xf59e0b,
    secondary: '#d97706',
    secondaryHex: 0xd97706,
    tertiary: '#b45309',
    tertiaryHex: 0xb45309,

    backgroundStart: '#100c09',
    backgroundStartHex: 0x100c09,
    backgroundEnd: '#18130e',
    backgroundEndHex: 0x18130e,

    // Particle colors - amber and deep orange
    particlePrimary: '#f59e0b',
    particlePrimaryHex: 0xf59e0b,
    particleSecondary: '#d97706',
    particleSecondaryHex: 0xd97706,

    glowIntensity: 0.8,

    fogColor: '#100c09',
    fogColorHex: 0x100c09,
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
