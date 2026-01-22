import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { videoColors } from '../lib/theme-colors';

interface TypewriterTextProps {
  text: string;
  /** Frame when typing starts */
  startFrame?: number;
  /** Frames per character */
  speed?: number;
  /** Font size in pixels */
  fontSize?: number;
  /** Text color */
  color?: string;
  /** Whether to show blinking cursor */
  showCursor?: boolean;
  /** Additional style */
  style?: React.CSSProperties;
}

export function TypewriterText({
  text,
  startFrame = 0,
  speed = 2,
  fontSize = 48,
  color = videoColors.textPrimary,
  showCursor = true,
  style,
}: TypewriterTextProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate how many characters should be visible
  const framesSinceStart = Math.max(0, frame - startFrame);
  const charsToShow = Math.floor(framesSinceStart / speed);
  const visibleText = text.slice(0, charsToShow);

  // Cursor blink - on for 15 frames, off for 15 frames
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  // Typing is complete when all characters are shown
  const isComplete = charsToShow >= text.length;

  return (
    <div
      style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize,
        color,
        display: 'inline-block',
        ...style,
      }}
    >
      {visibleText}
      {showCursor && (
        <span
          style={{
            opacity: cursorVisible || !isComplete ? 1 : 0,
            color: videoColors.primary,
            marginLeft: 2,
          }}
        >
          |
        </span>
      )}
    </div>
  );
}

/**
 * Animated text that reveals word by word
 */
interface WordRevealTextProps {
  text: string;
  startFrame?: number;
  /** Frames per word */
  speed?: number;
  fontSize?: number;
  color?: string;
  style?: React.CSSProperties;
}

export function WordRevealText({
  text,
  startFrame = 0,
  speed = 8,
  fontSize = 32,
  color = videoColors.textSecondary,
  style,
}: WordRevealTextProps) {
  const frame = useCurrentFrame();

  const words = text.split(' ');
  const framesSinceStart = Math.max(0, frame - startFrame);
  const wordsToShow = Math.floor(framesSinceStart / speed);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize,
        color,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.3em',
        ...style,
      }}
    >
      {words.map((word, index) => {
        const wordFrame = startFrame + index * speed;
        const isVisible = frame >= wordFrame;
        const wordProgress = Math.min(1, (frame - wordFrame) / (speed * 0.5));

        const opacity = interpolate(wordProgress, [0, 1], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const translateY = interpolate(wordProgress, [0, 1], [10, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <span
            key={index}
            style={{
              opacity: isVisible ? opacity : 0,
              transform: `translateY(${translateY}px)`,
              display: 'inline-block',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}

/**
 * Character-by-character reveal with fade
 */
interface CharacterRevealProps {
  text: string;
  startFrame?: number;
  /** Frames per character */
  speed?: number;
  fontSize?: number;
  color?: string;
  highlightColor?: string;
  style?: React.CSSProperties;
}

export function CharacterReveal({
  text,
  startFrame = 0,
  speed = 1,
  fontSize = 48,
  color = videoColors.textPrimary,
  highlightColor = videoColors.primary,
  style,
}: CharacterRevealProps) {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize,
        ...style,
      }}
    >
      {text.split('').map((char, index) => {
        const charFrame = startFrame + index * speed;
        const charProgress = Math.min(1, Math.max(0, (frame - charFrame) / 10));

        // Character transitions from highlight to normal color
        const isNew = frame - charFrame < 15;

        return (
          <span
            key={index}
            style={{
              opacity: charProgress,
              color: isNew ? highlightColor : color,
              transition: 'color 0.2s ease',
              display: 'inline-block',
              transform: `translateY(${interpolate(charProgress, [0, 1], [8, 0])}px)`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </div>
  );
}
