import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { videoColors, createGradient } from '../lib/theme-colors';

interface GlowingCTAProps {
  text: string;
  /** Frame when CTA appears */
  startFrame?: number;
  /** Width of the button */
  width?: number;
  /** Height of the button */
  height?: number;
  /** Font size */
  fontSize?: number;
  /** Additional style */
  style?: React.CSSProperties;
}

export function GlowingCTA({
  text,
  startFrame = 0,
  width = 300,
  height = 60,
  fontSize = 20,
  style,
}: GlowingCTAProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 12,
      mass: 0.8,
    },
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Glow pulse animation (cycles every 60 frames)
  const glowFrame = (frame - startFrame) % 60;
  const glowIntensity = interpolate(
    glowFrame,
    [0, 30, 60],
    [0.4, 0.8, 0.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Shimmer effect position
  const shimmerPosition = interpolate(
    (frame - startFrame) % 120,
    [0, 120],
    [-100, 200]
  );

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width,
          height,
          borderRadius: height / 2,
          background: createGradient('135deg', [
            videoColors.primary,
            videoColors.secondary,
          ]),
          boxShadow: `
            0 0 ${20 * glowIntensity}px ${videoColors.primary}80,
            0 0 ${40 * glowIntensity}px ${videoColors.primary}40,
            0 0 ${60 * glowIntensity}px ${videoColors.primary}20
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: shimmerPosition,
            width: 50,
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            transform: 'skewX(-20deg)',
          }}
        />

        {/* Text */}
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize,
            fontWeight: 600,
            color: videoColors.bgDark,
            letterSpacing: '0.02em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {text}
        </span>

        {/* Arrow icon */}
        <svg
          width={fontSize}
          height={fontSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={videoColors.bgDark}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginLeft: 8, position: 'relative', zIndex: 1 }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Pulsing dot indicator
 */
interface PulsingDotProps {
  color?: string;
  size?: number;
  startFrame?: number;
}

export function PulsingDot({
  color = videoColors.primary,
  size = 12,
  startFrame = 0,
}: PulsingDotProps) {
  const frame = useCurrentFrame();

  const pulseFrame = (frame - startFrame) % 40;
  const scale = interpolate(
    pulseFrame,
    [0, 20, 40],
    [1, 1.3, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacity = interpolate(
    pulseFrame,
    [0, 20, 40],
    [0.8, 1, 0.8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        transform: `scale(${scale})`,
        opacity,
        boxShadow: `0 0 ${size}px ${color}80`,
      }}
    />
  );
}
