'use client';

import { useState, useCallback, useEffect } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { Play, Pause, Maximize2, RotateCcw } from 'lucide-react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { DreamJourneyExplainer, dreamJourneyConfig } from '@/remotion/compositions/DreamJourneyExplainer';
import { ScrollReveal } from '@/components/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function VideoSection() {
  const playerRef = useRef<PlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const reducedMotion = useReducedMotion();

  // Auto-start tracking
  useEffect(() => {
    if (!reducedMotion) {
      setHasStarted(true);
      setIsPlaying(true);
    }
  }, [reducedMotion]);

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
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-dream-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-[rgb(var(--accent-primary))] bg-[rgb(var(--accent-primary))]/10 rounded-full border border-[rgb(var(--accent-primary))]/20 mb-4">
            Experience the Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[rgb(var(--text-primary))] mb-4">
            Your Dreams, Decoded
          </h2>
          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            Watch how AI transforms your nightly adventures into meaningful insights
          </p>
        </ScrollReveal>

        {/* Video player container */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="relative group">
            {/* Glow effect behind video */}
            <div className="absolute -inset-1 bg-gradient-to-r from-dream-500/20 via-aurora-500/20 to-cosmic-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            {/* Video wrapper */}
            <div className="relative rounded-2xl overflow-hidden border border-[rgb(var(--border-color))] bg-[rgb(var(--bg-secondary))] shadow-2xl">
              {/* Aspect ratio container - 16:9 */}
              <div className="relative aspect-video">
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
                  autoPlay={!reducedMotion}
                />

                {/* Play overlay - shows before first play or when paused */}
                {!hasStarted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer z-10"
                    onClick={handlePlayPause}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
                    >
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                    </motion.div>
                  </motion.div>
                )}

                {/* Custom controls overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="flex items-center justify-between">
                    {/* Left controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePlayPause}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                        )}
                      </button>

                      <button
                        onClick={handleRestart}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                        aria-label="Restart"
                      >
                        <RotateCcw className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleFullscreen}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-dream-500/30 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-aurora-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />
          </div>
        </ScrollReveal>

        {/* Video caption */}
        <ScrollReveal direction="up" delay={0.3}>
          <p className="text-center text-sm text-[rgb(var(--text-muted))] mt-6">
            Powered by AI dream analysis technology
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
