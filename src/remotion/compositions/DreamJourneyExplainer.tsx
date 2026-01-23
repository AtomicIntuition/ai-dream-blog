import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Sequence, spring, Easing } from 'remotion';
import { videoColors, createGradient } from '../lib/theme-colors';

/**
 * Main explainer video composition - 15 seconds at 30fps (450 frames)
 * Uses RESPONSIVE sizing - all dimensions calculated relative to composition size
 *
 * Sequence:
 * 0-90 (0-3s): Hero title with cinematic reveal
 * 90-180 (3-6s): AI brain visualization with particles
 * 180-270 (6-9s): Feature cards with staggered animation
 * 270-360 (9-12s): Dream symbols floating animation
 * 360-450 (12-15s): Epic CTA with glow
 */
export function DreamJourneyExplainer() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Responsive sizing - everything scales with composition dimensions
  const scale = Math.min(width / 1920, height / 1080);
  const baseFontSize = 64 * scale;
  const padding = 60 * scale;

  return (
    <AbsoluteFill
      style={{
        background: createGradient('135deg', [
          videoColors.bgDark,
          videoColors.bgMedium,
          videoColors.bgLight,
        ]),
      }}
    >
      {/* Ambient background effects */}
      <AmbientBackground />
      <FloatingOrbs />

      {/* Section 1: Hero Title (0-120 frames) */}
      <Sequence from={0} durationInFrames={120}>
        <HeroTitleSection scale={scale} />
      </Sequence>

      {/* Section 2: AI Brain (90-210 frames) */}
      <Sequence from={90} durationInFrames={120}>
        <AIBrainSection scale={scale} />
      </Sequence>

      {/* Section 3: Features (180-300 frames) */}
      <Sequence from={180} durationInFrames={120}>
        <FeaturesSection scale={scale} />
      </Sequence>

      {/* Section 4: Dream Symbols (270-390 frames) */}
      <Sequence from={270} durationInFrames={120}>
        <DreamSymbolsSection scale={scale} />
      </Sequence>

      {/* Section 5: CTA (360-450 frames) */}
      <Sequence from={360} durationInFrames={90}>
        <CTASection scale={scale} />
      </Sequence>
    </AbsoluteFill>
  );
}

/**
 * Hero title with cinematic zoom and glow
 */
function HeroTitleSection({ scale }: { scale: number }) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Smooth entrance with overshoot
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 1.2, stiffness: 80 },
    durationInFrames: 40,
  });

  const subtitleProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 16, mass: 0.8, stiffness: 100 },
    durationInFrames: 35,
  });

  // Title zoom and glow effect
  const titleScale = interpolate(titleProgress, [0, 1], [0.7, 1]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const glowIntensity = interpolate((frame % 60), [0, 30, 60], [0.3, 0.6, 0.3]);

  // Subtitle slide up
  const subtitleY = interpolate(subtitleProgress, [0, 1], [30 * scale, 0]);
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Main title with gradient and glow */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 80 * scale,
            fontWeight: 400,
            color: videoColors.textPrimary,
            margin: 0,
            textShadow: `
              0 0 ${60 * glowIntensity * scale}px ${videoColors.primary}60,
              0 0 ${120 * glowIntensity * scale}px ${videoColors.primary}30
            `,
            background: `linear-gradient(135deg, ${videoColors.textPrimary} 0%, ${videoColors.primary} 50%, ${videoColors.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Unlock Your Dreams
        </h1>

        {/* Decorative line */}
        <div
          style={{
            width: interpolate(titleProgress, [0, 1], [0, 200 * scale]),
            height: 2 * scale,
            background: `linear-gradient(90deg, transparent, ${videoColors.primary}, transparent)`,
            margin: `${20 * scale}px auto`,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 28 * scale,
          color: videoColors.textSecondary,
          margin: 0,
          marginTop: 10 * scale,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          letterSpacing: '0.02em',
        }}
      >
        AI-powered dream analysis at your fingertips
      </p>
    </AbsoluteFill>
  );
}

/**
 * AI Brain visualization with animated neural network
 */
function AIBrainSection({ scale }: { scale: number }) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const brainProgress = spring({
    frame,
    fps,
    config: { damping: 18, mass: 1, stiffness: 90 },
  });

  const textProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const rotation = interpolate(frame, [0, 300], [0, 360]);
  const pulseScale = 1 + Math.sin(frame * 0.1) * 0.05;

  // Neural network nodes
  const nodeCount = 24;
  const centerX = width / 2;
  const centerY = height / 2 - 40 * scale;
  const radius = 120 * scale;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer rotating ring */}
      <div
        style={{
          position: 'absolute',
          top: centerY - radius * 1.5,
          left: centerX - radius * 1.5,
          width: radius * 3,
          height: radius * 3,
          opacity: brainProgress * 0.5,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <svg width={radius * 3} height={radius * 3}>
          <circle
            cx={radius * 1.5}
            cy={radius * 1.5}
            r={radius * 1.3}
            fill="none"
            stroke={videoColors.secondary}
            strokeWidth={1 * scale}
            strokeDasharray={`${10 * scale} ${10 * scale}`}
            opacity={0.4}
          />
        </svg>
      </div>

      {/* Inner rotating ring (opposite direction) */}
      <div
        style={{
          position: 'absolute',
          top: centerY - radius * 1.2,
          left: centerX - radius * 1.2,
          width: radius * 2.4,
          height: radius * 2.4,
          opacity: brainProgress * 0.6,
          transform: `rotate(${-rotation * 0.7}deg)`,
        }}
      >
        <svg width={radius * 2.4} height={radius * 2.4}>
          <circle
            cx={radius * 1.2}
            cy={radius * 1.2}
            r={radius}
            fill="none"
            stroke={videoColors.primary}
            strokeWidth={2 * scale}
            strokeDasharray={`${20 * scale} ${15 * scale}`}
            opacity={0.5}
          />
        </svg>
      </div>

      {/* Central brain icon with glow */}
      <div
        style={{
          position: 'absolute',
          top: centerY - 60 * scale,
          left: centerX - 60 * scale,
          width: 120 * scale,
          height: 120 * scale,
          opacity: brainProgress,
          transform: `scale(${pulseScale})`,
        }}
      >
        <svg
          width={120 * scale}
          height={120 * scale}
          viewBox="0 0 24 24"
          fill="none"
          style={{
            filter: `drop-shadow(0 0 ${20 * scale}px ${videoColors.primary})`,
          }}
        >
          <path
            d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5"
            stroke={videoColors.primary}
            strokeWidth={1.5}
            fill={`${videoColors.primary}20`}
          />
          <path
            d="M9 12h6M12 9v6"
            stroke={videoColors.textPrimary}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Floating neural nodes */}
      {Array.from({ length: nodeCount }).map((_, i) => {
        const angle = (i / nodeCount) * Math.PI * 2 + frame * 0.02;
        const nodeRadius = radius * (0.8 + Math.sin(i * 2 + frame * 0.05) * 0.3);
        const x = Math.cos(angle) * nodeRadius;
        const y = Math.sin(angle) * nodeRadius;
        const nodeSize = (3 + Math.sin(i + frame * 0.1) * 2) * scale;
        const nodeOpacity = 0.3 + Math.sin(i * 3 + frame * 0.08) * 0.3;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: centerX + x - nodeSize / 2,
              top: centerY + y - nodeSize / 2,
              width: nodeSize,
              height: nodeSize,
              borderRadius: '50%',
              backgroundColor: i % 3 === 0 ? videoColors.primary : videoColors.secondary,
              opacity: brainProgress * nodeOpacity,
              boxShadow: `0 0 ${nodeSize * 2}px ${i % 3 === 0 ? videoColors.primary : videoColors.secondary}`,
            }}
          />
        );
      })}

      {/* Text */}
      <p
        style={{
          position: 'absolute',
          top: centerY + radius + 60 * scale,
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 36 * scale,
          color: videoColors.textPrimary,
          opacity: textProgress,
          transform: `translateY(${interpolate(textProgress, [0, 1], [20 * scale, 0])}px)`,
          textShadow: `0 0 ${40 * scale}px ${videoColors.primary}40`,
        }}
      >
        Your subconscious, decoded
      </p>
    </AbsoluteFill>
  );
}

/**
 * Features section with staggered card animations
 */
function FeaturesSection({ scale }: { scale: number }) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const features = [
    { icon: '🎙️', title: 'Record', desc: 'Voice & text capture', color: '#c9a87c' },
    { icon: '🧠', title: 'Analyze', desc: 'AI interpretation', color: '#8b9dc3' },
    { icon: '📊', title: 'Track', desc: 'Pattern recognition', color: '#a78bfa' },
    { icon: '💡', title: 'Insights', desc: 'Growth guidance', color: '#34d399' },
  ];

  const cardWidth = 200 * scale;
  const cardHeight = 140 * scale;
  const gap = 24 * scale;
  const totalWidth = cardWidth * 2 + gap;
  const totalHeight = cardHeight * 2 + gap;
  const startX = (width - totalWidth) / 2;
  const startY = (height - totalHeight) / 2;

  return (
    <AbsoluteFill>
      {/* Header */}
      {(() => {
        const headerProgress = spring({
          frame,
          fps,
          config: { damping: 14 },
        });
        return (
          <div
            style={{
              position: 'absolute',
              top: startY - 80 * scale,
              width: '100%',
              textAlign: 'center',
              opacity: headerProgress,
              transform: `translateY(${interpolate(headerProgress, [0, 1], [20 * scale, 0])}px)`,
            }}
          >
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 44 * scale,
                color: videoColors.textPrimary,
                margin: 0,
              }}
            >
              Powerful Features
            </h2>
          </div>
        );
      })()}

      {/* Feature Cards Grid */}
      {features.map((feature, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        const x = startX + col * (cardWidth + gap);
        const y = startY + row * (cardHeight + gap);

        const delay = index * 8;
        const cardProgress = spring({
          frame: frame - delay,
          fps,
          config: { damping: 12, mass: 0.9 },
        });

        const hoverPulse = 1 + Math.sin((frame + index * 20) * 0.08) * 0.02;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: cardWidth,
              height: cardHeight,
              opacity: cardProgress,
              transform: `
                translateY(${interpolate(cardProgress, [0, 1], [40 * scale, 0])}px)
                scale(${cardProgress * hoverPulse})
              `,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `rgba(255,255,255,0.03)`,
                backdropFilter: 'blur(10px)',
                borderRadius: 20 * scale,
                border: `1px solid rgba(255,255,255,0.08)`,
                padding: 24 * scale,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `
                  0 0 ${30 * scale}px ${feature.color}15,
                  inset 0 0 ${60 * scale}px ${feature.color}05
                `,
              }}
            >
              <div style={{ fontSize: 40 * scale, marginBottom: 12 * scale }}>
                {feature.icon}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 22 * scale,
                  fontWeight: 600,
                  color: videoColors.textPrimary,
                  marginBottom: 4 * scale,
                }}
              >
                {feature.title}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14 * scale,
                  color: videoColors.textMuted,
                }}
              >
                {feature.desc}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

/**
 * Dream symbols section with floating animation
 */
function DreamSymbolsSection({ scale }: { scale: number }) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const symbols = [
    { emoji: '🌙', size: 80, x: -150, y: -30 },
    { emoji: '⭐', size: 60, x: 0, y: -60 },
    { emoji: '✨', size: 50, x: 150, y: -20 },
    { emoji: '🌟', size: 55, x: -80, y: 40 },
    { emoji: '💫', size: 45, x: 100, y: 50 },
  ];

  const textProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  const subtitleProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 16 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Floating symbols */}
      <div
        style={{
          position: 'relative',
          width: 400 * scale,
          height: 200 * scale,
          marginBottom: 30 * scale,
        }}
      >
        {symbols.map((symbol, i) => {
          const delay = i * 6;
          const symbolProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 10, mass: 1.2 },
          });

          const floatY = Math.sin((frame + i * 30) * 0.06) * 15 * scale;
          const floatRotate = Math.sin((frame + i * 20) * 0.04) * 8;
          const glowPulse = 0.4 + Math.sin((frame + i * 25) * 0.08) * 0.3;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                fontSize: symbol.size * scale,
                opacity: symbolProgress,
                transform: `
                  translate(${symbol.x * scale - (symbol.size * scale) / 2}px, ${symbol.y * scale + floatY - (symbol.size * scale) / 2}px)
                  scale(${symbolProgress})
                  rotate(${floatRotate}deg)
                `,
                filter: `drop-shadow(0 0 ${20 * glowPulse * scale}px ${videoColors.primary})`,
              }}
            >
              {symbol.emoji}
            </div>
          );
        })}
      </div>

      {/* Main text */}
      <h2
        style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 52 * scale,
          color: videoColors.textPrimary,
          margin: 0,
          opacity: textProgress,
          transform: `translateY(${interpolate(textProgress, [0, 1], [30 * scale, 0])}px)`,
          textShadow: `0 0 ${60 * scale}px ${videoColors.primary}40`,
        }}
      >
        Discover Hidden Meanings
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 26 * scale,
          color: videoColors.textSecondary,
          margin: 0,
          marginTop: 16 * scale,
          opacity: subtitleProgress,
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20 * scale, 0])}px)`,
        }}
      >
        in every dream symbol
      </p>
    </AbsoluteFill>
  );
}

/**
 * CTA section with epic glow button
 */
function CTASection({ scale }: { scale: number }) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const buttonProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, mass: 1 },
  });

  // Button glow animation
  const glowCycle = (frame % 90) / 90;
  const glowIntensity = 0.5 + Math.sin(glowCycle * Math.PI * 2) * 0.3;

  // Shimmer position
  const shimmerX = interpolate((frame % 120), [0, 120], [-150, 350]);

  const buttonWidth = 280 * scale;
  const buttonHeight = 70 * scale;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 56 * scale,
          color: videoColors.textPrimary,
          margin: 0,
          marginBottom: 40 * scale,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [30 * scale, 0])}px)`,
          textShadow: `0 0 ${80 * scale}px ${videoColors.primary}50`,
        }}
      >
        Start Your Journey
      </h2>

      {/* CTA Button */}
      <div
        style={{
          opacity: buttonProgress,
          transform: `scale(${interpolate(buttonProgress, [0, 1], [0.8, 1])})`,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: buttonWidth,
            height: buttonHeight,
            borderRadius: buttonHeight / 2,
            background: `linear-gradient(135deg, ${videoColors.primary} 0%, ${videoColors.secondary} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `
              0 0 ${40 * glowIntensity * scale}px ${videoColors.primary}80,
              0 0 ${80 * glowIntensity * scale}px ${videoColors.primary}40,
              0 0 ${120 * glowIntensity * scale}px ${videoColors.primary}20,
              0 ${10 * scale}px ${40 * scale}px rgba(0,0,0,0.3)
            `,
            overflow: 'hidden',
          }}
        >
          {/* Shimmer effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: shimmerX * scale,
              width: 80 * scale,
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              transform: 'skewX(-20deg)',
            }}
          />

          {/* Button text */}
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 24 * scale,
              fontWeight: 600,
              color: videoColors.bgDark,
              letterSpacing: '0.02em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Try Free Today
          </span>

          {/* Arrow icon */}
          <svg
            width={24 * scale}
            height={24 * scale}
            viewBox="0 0 24 24"
            fill="none"
            stroke={videoColors.bgDark}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginLeft: 12 * scale, position: 'relative', zIndex: 1 }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Subtext */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16 * scale,
          color: videoColors.textMuted,
          marginTop: 24 * scale,
          opacity: interpolate(buttonProgress, [0, 1], [0, 0.8]),
        }}
      >
        No credit card required
      </p>
    </AbsoluteFill>
  );
}

/**
 * Ambient background with gradient orbs
 */
function AmbientBackground() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const orbs = [
    { x: 20, y: 30, size: 500, color: videoColors.primary, speed: 0.3 },
    { x: 80, y: 70, size: 400, color: videoColors.secondary, speed: 0.2 },
    { x: 50, y: 50, size: 600, color: videoColors.tertiary, speed: 0.15 },
  ];

  return (
    <AbsoluteFill style={{ opacity: 0.15 }}>
      {orbs.map((orb, i) => {
        const moveX = Math.sin(frame * orb.speed * 0.02 + i) * 50;
        const moveY = Math.cos(frame * orb.speed * 0.02 + i * 2) * 30;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}40 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`,
              filter: 'blur(60px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
}

/**
 * Floating orbs/particles
 */
function FloatingOrbs() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = Array.from({ length: 40 }, (_, i) => ({
    x: (Math.sin(i * 7.3) * 0.5 + 0.5) * 100,
    y: (Math.cos(i * 4.7) * 0.5 + 0.5) * 100,
    size: 2 + (i % 4),
    speed: 0.3 + (i % 5) * 0.15,
    delay: i * 8,
    color: i % 3 === 0 ? videoColors.primary : i % 3 === 1 ? videoColors.secondary : videoColors.accentPurple,
  }));

  return (
    <AbsoluteFill style={{ opacity: 0.5 }}>
      {particles.map((particle, i) => {
        const yOffset = ((frame + particle.delay) * particle.speed) % 150;
        const opacity = interpolate(yOffset, [0, 75, 150], [0, 0.8, 0]);
        const xWobble = Math.sin((frame + particle.delay) * 0.03) * 10;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(${particle.x}% + ${xWobble}px)`,
              top: `${particle.y - yOffset * 0.5}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: particle.color,
              opacity,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
}

// Export configuration for Remotion
export const dreamJourneyConfig = {
  id: 'DreamJourneyExplainer',
  component: DreamJourneyExplainer,
  durationInFrames: 450, // 15 seconds at 30fps
  fps: 30,
  width: 1920,
  height: 1080,
};
