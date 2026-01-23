'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { Play, Pause, Maximize2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { DreamJourneyExplainer, dreamJourneyConfig } from '@/remotion/compositions/DreamJourneyExplainer';
import { ScrollReveal } from '@/components/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function VideoSection() {
  const playerRef = useRef<PlayerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const reducedMotion = useReducedMotion();

  // Intersection observer for performance - only render video when in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Auto-pause when out of view
        if (!entry.isIntersecting && playerRef.current && isPlaying) {
          playerRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.2, rootMargin: '100px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isPlaying]);

  // Auto-start when in view (if not reduced motion)
  useEffect(() => {
    if (isInView && !reducedMotion && !hasStarted) {
      const timer = setTimeout(() => {
        setHasStarted(true);
        setIsPlaying(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, reducedMotion, hasStarted]);

  const handlePlayPause = useCallback(() => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setHasStarted(true);
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleRestart = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(0);
    playerRef.current.play();
    setIsPlaying(true);
    setHasStarted(true);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.requestFullscreen();
  }, []);

  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-dream-500/5 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal direction="up" className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-[rgb(var(--accent-primary))] bg-[rgb(var(--accent-primary))]/10 rounded-full border border-[rgb(var(--accent-primary))]/20 mb-3 sm:mb-4">
            Experience the Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[rgb(var(--text-primary))] mb-3 sm:mb-4">
            Your Dreams, Decoded
          </h2>
          <p className="text-base sm:text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto px-2">
            Watch how AI transforms your nightly adventures into meaningful insights
          </p>
        </ScrollReveal>

        {/* Video player container */}
        <ScrollReveal direction="up" delay={0.2}>
          <div ref={containerRef} className="relative group">
            {/* Glow effect behind video */}
            <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-dream-500/20 via-aurora-500/20 to-cosmic-500/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            {/* Video wrapper */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[rgb(var(--border-color))] bg-[rgb(var(--bg-secondary))] shadow-xl sm:shadow-2xl">
              {/* Aspect ratio container - 16:9 with minimum height for mobile */}
              <div className="relative aspect-video min-h-[200px] sm:min-h-[280px]">
                {isInView && (
                  <Player
                    ref={playerRef}
                    component={DreamJourneyExplainer}
                    durationInFrames={dreamJourneyConfig.durationInFrames}
                    fps={dreamJourneyConfig.fps}
                    compositionWidth={dreamJourneyConfig.width}
                    compositionHeight={dreamJourneyConfig.height}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    controls={false}
                    loop
                    autoPlay={!reducedMotion && hasStarted}
                    clickToPlay={false}
                  />
                )}

                {/* Loading state when not in view */}
                {!isInView && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[rgb(var(--bg-secondary))]">
                    <div className="w-12 h-12 rounded-full border-2 border-[rgb(var(--accent-primary))]/20 border-t-[rgb(var(--accent-primary))] animate-spin" />
                  </div>
                )}

                {/* Play overlay - shows before first play or when paused */}
                {!hasStarted && isInView && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer z-10"
                    onClick={handlePlayPause}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                    >
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white ml-0.5 sm:ml-1" fill="white" />
                    </motion.div>
                    <span className="absolute bottom-4 sm:bottom-6 text-xs sm:text-sm text-white/80 font-medium">
                      Tap to play
                    </span>
                  </motion.div>
                )}

                {/* Custom controls overlay - always visible on mobile for better UX */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="flex items-center justify-between">
                    {/* Left controls */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={handlePlayPause}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        ) : (
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="white" />
                        )}
                      </button>

                      <button
                        onClick={handleRestart}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
                        aria-label="Restart"
                      >
                        <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={handleFullscreen}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements - hidden on very small screens */}
            <div className="hidden sm:block absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-dream-500/30 to-transparent rounded-full blur-xl sm:blur-2xl pointer-events-none" />
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-tr from-aurora-500/20 to-transparent rounded-full blur-xl sm:blur-2xl pointer-events-none" />
          </div>
        </ScrollReveal>

        {/* Video caption */}
        <ScrollReveal direction="up" delay={0.3}>
          <p className="text-center text-xs sm:text-sm text-[rgb(var(--text-muted))] mt-4 sm:mt-6">
            Powered by AI dream analysis technology
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
