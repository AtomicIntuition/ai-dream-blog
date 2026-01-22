'use client';

import { useRef, ReactNode, Children, isValidElement, cloneElement } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StaggerChildrenProps {
  children: ReactNode;
  /** Delay between each child animation (in seconds) */
  staggerDelay?: number;
  /** Initial delay before first child animates (in seconds) */
  initialDelay?: number;
  /** Duration for each child animation (in seconds) */
  duration?: number;
  /** Direction children animate from */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distance to animate from */
  distance?: number;
  /** Amount of container that must be visible to trigger */
  threshold?: number;
  /** Whether animation should only happen once */
  once?: boolean;
  /** Additional className for container */
  className?: string;
  /** Tag name for container */
  as?: keyof JSX.IntrinsicElements;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 20,
  threshold = 0.1,
  once = true,
  className = '',
  as: Component = 'div',
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });
  const prefersReducedMotion = useReducedMotion();

  // Calculate initial position based on direction
  const getInitialOffset = () => {
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

  const offset = getInitialOffset();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : initialDelay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // If reduced motion, render without animation wrapper
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;

        return (
          <motion.div variants={childVariants}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/**
 * Grid-specific stagger component for card layouts
 */
interface StaggerGridProps extends Omit<StaggerChildrenProps, 'as'> {
  /** Number of columns for stagger calculation */
  columns?: number;
}

export function StaggerGrid({
  children,
  columns = 3,
  staggerDelay = 0.08,
  ...props
}: StaggerGridProps) {
  return (
    <StaggerChildren
      staggerDelay={staggerDelay}
      direction="up"
      distance={15}
      {...props}
    >
      {children}
    </StaggerChildren>
  );
}
