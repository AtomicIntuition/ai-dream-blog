'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Brain, LineChart, Lightbulb, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal, StaggerGrid } from '@/components/animations';

interface Feature {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

const features: Feature[] = [
  {
    id: 'record',
    icon: Mic,
    title: 'Voice Recording',
    description: 'Capture dreams the moment you wake with voice-to-text transcription',
    color: 'text-rose-400',
    gradient: 'from-rose-500/20 to-rose-600/10',
  },
  {
    id: 'analyze',
    icon: Brain,
    title: 'AI Analysis',
    description: 'Advanced AI interprets symbols, emotions, and hidden meanings',
    color: 'text-purple-400',
    gradient: 'from-purple-500/20 to-purple-600/10',
  },
  {
    id: 'patterns',
    icon: LineChart,
    title: 'Pattern Discovery',
    description: 'Track recurring themes and symbols across your dream journal',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-cyan-600/10',
  },
  {
    id: 'insights',
    icon: Lightbulb,
    title: 'Personal Insights',
    description: 'Receive personalized guidance based on your unique dream patterns',
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-amber-600/10',
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Card */}
      <div className={`
        relative h-full p-6 rounded-2xl border border-[rgb(var(--border-color))]
        bg-gradient-to-br ${feature.gradient}
        backdrop-blur-sm
        transition-all duration-500
        hover:border-[rgb(var(--border-hover))]
        hover:shadow-lg hover:shadow-[rgb(var(--accent-primary))]/5
      `}>
        {/* Animated background glow on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgb(var(--accent-primary))]/5 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Icon container with animation */}
        <div className="relative mb-4">
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`
              w-14 h-14 rounded-xl
              bg-[rgb(var(--bg-tertiary))]
              flex items-center justify-center
              border border-[rgb(var(--border-color))]
            `}
          >
            <Icon className={`w-7 h-7 ${feature.color}`} />
          </motion.div>

          {/* Sparkle effect on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-4 h-4 text-[rgb(var(--accent-primary))]" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -bottom-1 right-2"
                >
                  <Sparkles className="w-3 h-3 text-[rgb(var(--accent-secondary))]" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))] mb-2 group-hover:text-[rgb(var(--accent-primary))] transition-colors">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[rgb(var(--text-muted))] leading-relaxed">
          {feature.description}
        </p>

        {/* Animated underline on hover */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] origin-left rounded-full"
        />
      </div>
    </motion.div>
  );
}

export function FeatureShowcase() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aurora-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dream-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-[rgb(var(--accent-primary))] bg-[rgb(var(--accent-primary))]/10 rounded-full border border-[rgb(var(--accent-primary))]/20 mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[rgb(var(--text-primary))] mb-4">
            Dream Analysis Made Simple
          </h2>
          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            Four powerful features that transform how you understand your dreams
          </p>
        </ScrollReveal>

        {/* Feature cards grid */}
        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </StaggerGrid>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.4} className="text-center mt-12">
          <Link
            href="https://dreamanalysis.netlify.app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(var(--accent-primary))] text-white font-medium rounded-full hover:opacity-90 transition-opacity group"
          >
            Start Analyzing Dreams
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
