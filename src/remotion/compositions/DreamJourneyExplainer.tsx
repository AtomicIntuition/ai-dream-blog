import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Sequence, spring } from 'remotion';
import { TypewriterText, WordRevealText } from '../components/TypewriterText';
import { GlowingCTA } from '../components/GlowingCTA';
import { MorphingSymbols, MoonSymbol, StarSymbol, SparklesSymbol } from '../components/DreamSymbols';
import { NeuralBrain, NeuralRing } from '../components/NeuralBrain';
import { videoColors, createGradient } from '../lib/theme-colors';

/**
 * Main explainer video composition - 15 seconds at 30fps (450 frames)
 *
 * Sequence:
 * 0-90 (0-3s): Title reveal with typewriter effect
 * 90-180 (3-6s): Neural brain visualization
 * 180-270 (6-9s): Feature text animation
 * 270-360 (9-12s): Morphing dream symbols
 * 360-450 (12-15s): CTA with glow animation
 */
export function DreamJourneyExplainer() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

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
      {/* Ambient particles/stars in background */}
      <BackgroundParticles />

      {/* Section 1: Title (0-90 frames) */}
      <Sequence from={0} durationInFrames={120}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TypewriterText
            text="Unlock Your Dreams"
            startFrame={10}
            speed={3}
            fontSize={64}
            color={videoColors.textPrimary}
            style={{ marginBottom: 20 }}
          />
          <WordRevealText
            text="AI-powered dream analysis at your fingertips"
            startFrame={50}
            speed={6}
            fontSize={24}
            color={videoColors.textSecondary}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Section 2: Neural Brain (90-180 frames) */}
      <Sequence from={90} durationInFrames={120}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative' }}>
            <NeuralBrain startFrame={0} size={280} />
            <NeuralRing startFrame={15} size={350} />
          </div>
          <WordRevealText
            text="Your subconscious, decoded"
            startFrame={40}
            speed={5}
            fontSize={28}
            color={videoColors.textPrimary}
            style={{ marginTop: 30 }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Section 3: Features (180-270 frames) */}
      <Sequence from={180} durationInFrames={120}>
        <FeatureShowcase />
      </Sequence>

      {/* Section 4: Dream Symbols (270-360 frames) */}
      <Sequence from={270} durationInFrames={120}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 40,
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <MoonSymbol startFrame={0} size={70} />
            <StarSymbol startFrame={10} size={60} />
            <SparklesSymbol startFrame={20} size={60} />
          </div>
          <TypewriterText
            text="Discover hidden meanings"
            startFrame={30}
            speed={2}
            fontSize={48}
            color={videoColors.textPrimary}
          />
          <WordRevealText
            text="in every dream symbol"
            startFrame={70}
            speed={5}
            fontSize={28}
            color={videoColors.textSecondary}
            style={{ marginTop: 16 }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Section 5: CTA (360-450 frames) */}
      <Sequence from={360} durationInFrames={90}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TypewriterText
            text="Start Your Journey"
            startFrame={0}
            speed={2}
            fontSize={52}
            color={videoColors.textPrimary}
            showCursor={false}
            style={{ marginBottom: 30 }}
          />
          <GlowingCTA
            text="Try Free"
            startFrame={30}
            width={220}
            height={56}
            fontSize={18}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

/**
 * Feature showcase section
 */
function FeatureShowcase() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    { icon: '🎙️', title: 'Record', desc: 'Voice & text dream capture' },
    { icon: '🧠', title: 'Analyze', desc: 'AI-powered interpretation' },
    { icon: '📊', title: 'Track', desc: 'Pattern recognition' },
    { icon: '💡', title: 'Insights', desc: 'Personal growth guidance' },
  ];

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          maxWidth: 600,
        }}
      >
        {features.map((feature, index) => {
          const delay = index * 15;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12 },
          });

          return (
            <div
              key={index}
              style={{
                background: `rgba(255,255,255,0.05)`,
                borderRadius: 16,
                padding: 24,
                opacity: progress,
                transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
                border: `1px solid rgba(255,255,255,0.1)`,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{feature.icon}</div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: videoColors.textPrimary,
                  marginBottom: 4,
                }}
              >
                {feature.title}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: videoColors.textMuted,
                }}
              >
                {feature.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

/**
 * Animated background particles
 */
function BackgroundParticles() {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: (Math.sin(i * 7.3) * 0.5 + 0.5) * 100,
    y: (Math.cos(i * 4.7) * 0.5 + 0.5) * 100,
    size: 2 + (i % 3),
    speed: 0.5 + (i % 4) * 0.2,
    delay: i * 10,
  }));

  return (
    <AbsoluteFill style={{ opacity: 0.4 }}>
      {particles.map((particle, i) => {
        const yOffset = ((frame + particle.delay) * particle.speed) % 120;
        const opacity = interpolate(yOffset, [0, 60, 120], [0, 0.8, 0]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y - yOffset * 0.5}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? videoColors.primary : videoColors.secondary,
              opacity,
              filter: `blur(${particle.size > 3 ? 1 : 0}px)`,
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
