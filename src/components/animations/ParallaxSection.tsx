'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxSectionProps {
  children: ReactNode;
  /** Parallax speed multiplier. Negative = moves opposite to scroll */
  speed?: number;
  /** Additional className */
  className?: string;
  /** Whether to apply opacity fade based on scroll */
  fade?: boolean;
  /** Range of scroll progress to animate within [start, end] */
  scrollRange?: [number, number];
}

export function ParallaxSection({
  children,
  speed = 0.3,
  className = '',
  fade = false,
  scrollRange = [0, 1],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate Y offset based on scroll progress and speed
  const y = useTransform(
    scrollYProgress,
    scrollRange,
    [100 * speed, -100 * speed]
  );

  // Calculate opacity if fade is enabled
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  // If reduced motion, render without parallax
  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          y,
          opacity: fade ? opacity : 1,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Background parallax layer that moves slower than foreground
 */
interface ParallaxBackgroundProps {
  children: ReactNode;
  /** How much slower the background moves (0.5 = half speed) */
  factor?: number;
  className?: string;
}

export function ParallaxBackground({
  children,
  factor = 0.5,
  className = '',
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${-20 * factor}%`]);

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Creates a depth effect with multiple layers
 */
interface ParallaxLayersProps {
  /** Array of layer content with their parallax speeds */
  layers: Array<{
    content: ReactNode;
    speed: number;
    className?: string;
  }>;
  className?: string;
}

interface ParallaxLayerItemProps {
  content: ReactNode;
  speed: number;
  className?: string;
  scrollYProgress: MotionValue<number>;
}

function ParallaxLayerItem({
  content,
  speed,
  className = '',
  scrollYProgress,
}: ParallaxLayerItemProps) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [50 * speed, -50 * speed]
  );

  return (
    <motion.div
      style={{ y }}
      className={`absolute inset-0 ${className}`}
    >
      {content}
    </motion.div>
  );
}

export function ParallaxLayers({ layers, className = '' }: ParallaxLayersProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={`relative ${className}`}>
        {layers.map((layer, index) => (
          <div key={index} className={`absolute inset-0 ${layer.className || ''}`}>
            {layer.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {layers.map((layer, index) => (
        <ParallaxLayerItem
          key={index}
          content={layer.content}
          speed={layer.speed}
          className={layer.className}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
