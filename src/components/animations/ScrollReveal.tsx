'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView, Variants, Transition } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: ReactNode;
  /** Direction the element animates from */
  direction?: Direction;
  /** Distance in pixels to animate from */
  distance?: number;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Duration of the animation (in seconds) */
  duration?: number;
  /** Amount of element that must be visible to trigger (0-1) */
  threshold?: number;
  /** Whether animation should only happen once */
  once?: boolean;
  /** Additional className */
  className?: string;
  /** Custom variants to override defaults */
  variants?: Variants;
}

export function ScrollReveal({
  children,
  direction = 'up',
  distance = 30,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  className = '',
  variants: customVariants,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });
  const prefersReducedMotion = useReducedMotion();

  // Calculate initial position based on direction
  const getInitialPosition = (): { x: number; y: number } => {
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
        return { x: 0, y: 0 };
    }
  };

  const initialPosition = getInitialPosition();

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      x: initialPosition.x,
      y: initialPosition.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  const variants = customVariants || defaultVariants;

  const transition: Transition = {
    duration: prefersReducedMotion ? 0 : duration,
    delay: prefersReducedMotion ? 0 : delay,
    ease: [0.4, 0, 0.2, 1],
  };

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Shorthand components for common directions
 */
export function RevealUp(props: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="up" {...props} />;
}

export function RevealDown(props: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="down" {...props} />;
}

export function RevealLeft(props: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="left" {...props} />;
}

export function RevealRight(props: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="right" {...props} />;
}

export function FadeIn(props: Omit<ScrollRevealProps, 'direction' | 'distance'>) {
  return <ScrollReveal direction="none" distance={0} {...props} />;
}
