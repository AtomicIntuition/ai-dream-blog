'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedCounterProps {
  /** Target number to count to */
  value: number;
  /** Duration of the animation in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Number of decimal places to show */
  decimals?: number;
  /** Prefix to show before number (e.g., "$") */
  prefix?: string;
  /** Suffix to show after number (e.g., "%", "+") */
  suffix?: string;
  /** Separator for thousands */
  separator?: string;
  /** Additional className */
  className?: string;
  /** Whether animation should only happen once */
  once?: boolean;
}

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView) return;
    if (once && hasAnimated.current) return;

    hasAnimated.current = true;

    // If reduced motion, just set the value immediately
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    // Start animation after delay
    const timeout = setTimeout(() => {
      const controls = animate(0, value, {
        duration,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (latest) => {
          setDisplayValue(latest);
        },
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, value, duration, delay, prefersReducedMotion, once]);

  // Format the number
  const formattedValue = displayValue.toFixed(decimals);
  const [integerPart, decimalPart] = formattedValue.split('.');

  // Add thousand separators
  const withSeparators = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const finalValue = decimalPart ? `${withSeparators}.${decimalPart}` : withSeparators;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {finalValue}
      {suffix}
    </span>
  );
}

/**
 * Animated percentage counter
 */
export function AnimatedPercentage({
  value,
  className = '',
  ...props
}: Omit<AnimatedCounterProps, 'suffix'>) {
  return (
    <AnimatedCounter
      value={value}
      suffix="%"
      className={className}
      {...props}
    />
  );
}

/**
 * Animated currency counter
 */
export function AnimatedCurrency({
  value,
  currency = '$',
  className = '',
  ...props
}: Omit<AnimatedCounterProps, 'prefix'> & { currency?: string }) {
  return (
    <AnimatedCounter
      value={value}
      prefix={currency}
      decimals={2}
      className={className}
      {...props}
    />
  );
}

/**
 * Counter with + suffix for growth metrics
 */
export function AnimatedGrowth({
  value,
  className = '',
  ...props
}: Omit<AnimatedCounterProps, 'suffix'>) {
  return (
    <AnimatedCounter
      value={value}
      suffix="+"
      className={className}
      {...props}
    />
  );
}
