import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { videoColors } from '../lib/theme-colors';

interface DreamSymbolsProps {
  /** Frame when animation starts */
  startFrame?: number;
  /** Size of the symbol */
  size?: number;
  /** Color of the symbol */
  color?: string;
}

/**
 * Moon symbol with glow
 */
export function MoonSymbol({
  startFrame = 0,
  size = 80,
  color = videoColors.accentGold,
}: DreamSymbolsProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15 },
  });

  const rotation = interpolate(
    (frame - startFrame) % 300,
    [0, 300],
    [0, 360]
  );

  const glowIntensity = interpolate(
    (frame - startFrame) % 60,
    [0, 30, 60],
    [0.5, 1, 0.5]
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        opacity: progress,
        transform: `scale(${progress}) rotate(${rotation * 0.1}deg)`,
        filter: `drop-shadow(0 0 ${20 * glowIntensity}px ${color})`,
      }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/**
 * Star symbol with twinkle
 */
export function StarSymbol({
  startFrame = 0,
  size = 60,
  color = videoColors.accentBlue,
}: DreamSymbolsProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12 },
  });

  const twinkle = interpolate(
    (frame - startFrame) % 30,
    [0, 15, 30],
    [0.7, 1, 0.7]
  );

  const rotation = interpolate(
    (frame - startFrame) % 120,
    [0, 120],
    [0, 72] // Stars look good rotating 72 degrees (360/5)
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        opacity: progress * twinkle,
        transform: `scale(${progress}) rotate(${rotation}deg)`,
        filter: `drop-shadow(0 0 ${15 * twinkle}px ${color})`,
      }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/**
 * Cloud symbol with float animation
 */
export function CloudSymbol({
  startFrame = 0,
  size = 100,
  color = videoColors.textSecondary,
}: DreamSymbolsProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 20 },
  });

  const floatY = interpolate(
    (frame - startFrame) % 120,
    [0, 60, 120],
    [0, -8, 0]
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        opacity: progress * 0.8,
        transform: `scale(${progress}) translateY(${floatY}px)`,
        filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.3))`,
      }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <path
          d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/**
 * Brain/mind symbol with pulse
 */
export function BrainSymbol({
  startFrame = 0,
  size = 80,
  color = videoColors.accentPurple,
}: DreamSymbolsProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15 },
  });

  const pulse = interpolate(
    (frame - startFrame) % 40,
    [0, 20, 40],
    [1, 1.05, 1]
  );

  const glowIntensity = interpolate(
    (frame - startFrame) % 40,
    [0, 20, 40],
    [0.5, 1, 0.5]
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        opacity: progress,
        transform: `scale(${progress * pulse})`,
        filter: `drop-shadow(0 0 ${20 * glowIntensity}px ${color})`,
      }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.5}>
        <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" />
        <path d="M15.7 6.4a1.5 1.5 0 1 0 1.8 2.4" />
        <path d="M8.3 6.4a1.5 1.5 0 1 1-1.8 2.4" />
        <path d="M12 8v4" />
        <path d="m9 14 3 2 3-2" />
      </svg>
    </div>
  );
}

/**
 * Sparkles/magic symbol
 */
export function SparklesSymbol({
  startFrame = 0,
  size = 60,
  color = videoColors.primary,
}: DreamSymbolsProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 10 },
  });

  // Each sparkle has different timing
  const sparkle1 = interpolate((frame - startFrame) % 45, [0, 22, 45], [0.5, 1, 0.5]);
  const sparkle2 = interpolate((frame - startFrame + 15) % 45, [0, 22, 45], [0.5, 1, 0.5]);
  const sparkle3 = interpolate((frame - startFrame + 30) % 45, [0, 22, 45], [0.5, 1, 0.5]);

  return (
    <div
      style={{
        width: size,
        height: size,
        opacity: progress,
        transform: `scale(${progress})`,
      }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={2}>
        <path
          d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
          style={{ opacity: sparkle1, filter: `drop-shadow(0 0 ${8 * sparkle1}px ${color})` }}
        />
        <path
          d="M5 3v4"
          style={{ opacity: sparkle2 }}
        />
        <path
          d="M19 17v4"
          style={{ opacity: sparkle3 }}
        />
        <path
          d="M3 5h4"
          style={{ opacity: sparkle2 }}
        />
        <path
          d="M17 19h4"
          style={{ opacity: sparkle3 }}
        />
      </svg>
    </div>
  );
}

/**
 * Animated symbol container that morphs between symbols
 */
interface MorphingSymbolsProps {
  startFrame?: number;
  size?: number;
  /** Frames to show each symbol */
  symbolDuration?: number;
}

export function MorphingSymbols({
  startFrame = 0,
  size = 80,
  symbolDuration = 60,
}: MorphingSymbolsProps) {
  const frame = useCurrentFrame();

  const symbols = [MoonSymbol, StarSymbol, CloudSymbol, BrainSymbol, SparklesSymbol];
  const currentIndex = Math.floor((frame - startFrame) / symbolDuration) % symbols.length;
  const localFrame = (frame - startFrame) % symbolDuration;

  // Fade in/out
  const opacity = interpolate(
    localFrame,
    [0, 10, symbolDuration - 10, symbolDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const CurrentSymbol = symbols[currentIndex];

  return (
    <div style={{ opacity }}>
      <CurrentSymbol startFrame={0} size={size} />
    </div>
  );
}
