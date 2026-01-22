// Remotion entry point
export { RemotionRoot } from './Root';

// Compositions
export { DreamJourneyExplainer, dreamJourneyConfig } from './compositions/DreamJourneyExplainer';

// Components - can be reused in React
export { TypewriterText, WordRevealText, CharacterReveal } from './components/TypewriterText';
export { GlowingCTA, PulsingDot } from './components/GlowingCTA';
export {
  MoonSymbol,
  StarSymbol,
  CloudSymbol,
  BrainSymbol,
  SparklesSymbol,
  MorphingSymbols,
} from './components/DreamSymbols';
export { NeuralBrain, NeuralRing } from './components/NeuralBrain';

// Theme
export { videoColors, easings, durations, createGradient } from './lib/theme-colors';
