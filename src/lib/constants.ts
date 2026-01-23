import { Moon, Brain, Bed, Sparkles } from 'lucide-react';

// Site configuration
export const SITE_URL = 'https://ai-dream-blog.vercel.app';
export const SITE_NAME = 'Dream Insights';

// Category icons mapping - hoisted outside components to avoid recreation
export const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'dream-stories': Moon,
  'dream-science': Brain,
  'sleep-tips': Bed,
  'symbolism': Sparkles,
} as const;

// Category descriptions - hoisted outside components to avoid recreation
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'dream-stories': 'AI-analyzed dreams with deep psychological insights',
  'dream-science': 'The neuroscience and psychology behind dreaming',
  'sleep-tips': 'Practical advice for better sleep and dream recall',
  'symbolism': 'Decode the hidden meanings in your dreams',
} as const;

// Theme order for cycling - Obsidian (night), Alabaster (day), Dusk (evening)
export const THEME_ORDER = ['obsidian', 'alabaster', 'dusk'] as const;

// Theme metadata for display
export const THEME_META = {
  obsidian: {
    name: 'Obsidian',
    description: 'Midnight Library',
  },
  alabaster: {
    name: 'Alabaster',
    description: 'Editorial White',
  },
  dusk: {
    name: 'Dusk',
    description: 'Candlelit Study',
  },
} as const;

// Valid category slugs
export const VALID_CATEGORIES = ['dream-stories', 'dream-science', 'sleep-tips', 'symbolism'] as const;

// Extended category descriptions for category pages
export const CATEGORY_DESCRIPTIONS_EXTENDED: Record<string, string> = {
  'dream-stories': 'Explore fascinating dreams analyzed by AI, uncovering hidden meanings and psychological insights.',
  'dream-science': 'Discover the neuroscience and psychology behind why we dream and what happens in our sleeping minds.',
  'sleep-tips': 'Practical advice for better sleep, dream recall, and optimizing your nighttime routine.',
  'symbolism': 'Learn the meanings of common dream symbols and how to interpret the messages from your subconscious.',
} as const;

// Category gradient colors
export const CATEGORY_COLORS: Record<string, string> = {
  'dream-stories': 'from-dream-500 to-dream-600',
  'dream-science': 'from-cyan-500 to-cyan-600',
  'sleep-tips': 'from-emerald-500 to-emerald-600',
  'symbolism': 'from-amber-500 to-amber-600',
} as const;

// Static OG images for each category (located in /public/images/)
// Images are 1200x630 JPEG format for Twitter card compatibility
export const OG_IMAGES = {
  default: '/images/ai-dream-blog.jpg',
  'dream-stories': '/images/dream-stories.jpg',
  'dream-science': '/images/dream-science.jpg',
  'sleep-tips': '/images/sleep-tips.jpg',
  'symbolism': '/images/dream-symbolism.jpg',
} as const;

// Get OG image path for a category
export function getOgImageForCategory(category?: string): string {
  if (!category) return OG_IMAGES.default;
  return OG_IMAGES[category as keyof typeof OG_IMAGES] || OG_IMAGES.default;
}
