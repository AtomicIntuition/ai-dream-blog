/**
 * Theme colors for Remotion videos
 * Used consistently across all video compositions
 */

export const videoColors = {
  // Primary palette - dream theme
  primary: '#c9a87c', // Champagne gold
  secondary: '#8b9dc3', // Steel blue
  tertiary: '#7c3aed', // Purple

  // Background colors
  bgDark: '#0a0a0f',
  bgMedium: '#12121a',
  bgLight: '#1a1a24',

  // Text colors
  textPrimary: '#f0f0f5',
  textSecondary: '#a0a0b0',
  textMuted: '#6a6a7a',

  // Accent colors
  accentGold: '#e8c4a0',
  accentBlue: '#aab8d8',
  accentPurple: '#a78bfa',

  // Gradient stops
  gradientStart: '#c9a87c',
  gradientMiddle: '#8b9dc3',
  gradientEnd: '#7c3aed',
};

/**
 * Animation easing functions
 */
export const easings = {
  easeOut: [0.4, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.6, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
};

/**
 * Standard durations in frames (at 30fps)
 */
export const durations = {
  fast: 10, // ~0.33s
  normal: 15, // 0.5s
  slow: 30, // 1s
  verySlow: 60, // 2s
};

/**
 * Create a gradient string
 */
export function createGradient(
  direction: string,
  colors: string[],
  stops?: number[]
): string {
  const colorStops = colors
    .map((color, i) => {
      const stop = stops?.[i] ?? (i / (colors.length - 1)) * 100;
      return `${color} ${stop}%`;
    })
    .join(', ');

  return `linear-gradient(${direction}, ${colorStops})`;
}
