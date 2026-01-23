'use client';

import Link from 'next/link';
import { Moon, Brain, Bed, Sparkles, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthorCard } from '@/components/posts/AuthorCard';
import { formatDate, calculateReadingTime, getCategoryLabel } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: string;
  published_at: string;
  generated_dream?: {
    isLucid?: boolean;
  };
}

interface Category {
  slug: string;
  name: string;
}

interface HeroContentProps {
  heroPost?: Post;
  secondaryPosts: Post[];
  categories: Category[];
}

// Category configuration with colors
const CATEGORY_CONFIG: Record<string, {
  icon: React.ElementType;
  gradient: string;
  bgGradient: string;
  accentColor: string;
  borderColor: string;
  textColor: string;
  lightTextColor: string;
}> = {
  'dream-stories': {
    icon: Moon,
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    accentColor: 'rgb(139, 92, 246)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    textColor: 'text-violet-400',
    lightTextColor: 'text-violet-300',
  },
  'dream-science': {
    icon: Brain,
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    accentColor: 'rgb(6, 182, 212)',
    borderColor: 'rgba(6, 182, 212, 0.3)',
    textColor: 'text-cyan-400',
    lightTextColor: 'text-cyan-300',
  },
  'sleep-tips': {
    icon: Bed,
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    accentColor: 'rgb(16, 185, 129)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    textColor: 'text-emerald-400',
    lightTextColor: 'text-emerald-300',
  },
  'symbolism': {
    icon: Sparkles,
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentColor: 'rgb(245, 158, 11)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    textColor: 'text-amber-400',
    lightTextColor: 'text-amber-300',
  },
};

const defaultConfig = CATEGORY_CONFIG['dream-stories'];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function HeroContent({ heroPost, secondaryPosts, categories }: HeroContentProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <HeroContentStatic
        heroPost={heroPost}
        secondaryPosts={secondaryPosts}
        categories={categories}
      />
    );
  }

  const heroConfig = heroPost ? (CATEGORY_CONFIG[heroPost.category] || defaultConfig) : defaultConfig;
  const HeroIcon = heroConfig.icon;

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Category Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap"
      >
        {categories.map((category, index) => {
          const config = CATEGORY_CONFIG[category.slug] || defaultConfig;
          const Icon = config.icon;
          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: config.borderColor,
                  background: `linear-gradient(135deg, ${config.accentColor}15, transparent)`,
                }}
              >
                <Icon className={`h-4 w-4 ${config.textColor}`} />
                <span className="text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))] transition-colors">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      {/* Main Content Grid */}
      {heroPost ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {/* Featured Post - Large Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href={`/post/${heroPost.slug}`} className="group block h-full">
              <article
                className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl"
                style={{ borderColor: heroConfig.borderColor }}
              >
                {/* Category gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${heroConfig.bgGradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-primary))]/90 via-[rgb(var(--bg-primary))]/50 to-transparent" />

                {/* Accent line at top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${heroConfig.gradient}`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-5 sm:p-6 lg:p-8 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
                  {/* Top section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      {/* Category badge */}
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${heroConfig.accentColor}, ${heroConfig.accentColor}dd)`,
                          color: 'white',
                        }}
                      >
                        <HeroIcon className="h-3.5 w-3.5" />
                        {getCategoryLabel(heroPost.category)}
                      </span>
                      {heroPost.generated_dream?.isLucid && (
                        <span className="px-2.5 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30">
                          Lucid
                        </span>
                      )}
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-[rgb(var(--text-muted))]">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Featured
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div className="space-y-3 sm:space-y-4">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[rgb(var(--text-primary))] leading-tight group-hover:text-[rgb(var(--accent-primary))] transition-colors">
                      {heroPost.title}
                    </h1>

                    {heroPost.subtitle && (
                      <p className="text-sm sm:text-base lg:text-lg text-[rgb(var(--text-secondary))] line-clamp-2">
                        {heroPost.subtitle}
                      </p>
                    )}

                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs sm:text-sm text-[rgb(var(--text-muted))]">
                      <AuthorCard variant="compact" />
                      <span className="hidden sm:inline">·</span>
                      <span>{formatDate(heroPost.published_at)}</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {calculateReadingTime(heroPost.content)} min read
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${heroConfig.accentColor}15, transparent 60%)`,
                  }}
                />
              </article>
            </Link>
          </motion.div>

          {/* Secondary Posts Column */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:gap-5">
            {secondaryPosts.map((post) => {
              const config = CATEGORY_CONFIG[post.category] || defaultConfig;
              const Icon = config.icon;

              return (
                <Link key={post.id} href={`/post/${post.slug}`} className="group flex-1">
                  <article
                    className="h-full rounded-xl sm:rounded-2xl overflow-hidden border bg-[rgb(var(--bg-secondary))]/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ borderColor: config.borderColor }}
                  >
                    {/* Accent line */}
                    <div className={`h-0.5 w-full bg-gradient-to-r ${config.gradient}`} />

                    <div className="p-4 sm:p-5">
                      {/* Category badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full"
                          style={{
                            background: `${config.accentColor}18`,
                            color: config.accentColor,
                            border: `1px solid ${config.borderColor}`,
                          }}
                        >
                          <Icon className="h-3 w-3" />
                          {getCategoryLabel(post.category)}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-semibold text-[rgb(var(--text-primary))] mb-2 group-hover:text-[rgb(var(--accent-primary))] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-sm text-[rgb(var(--text-muted))] line-clamp-2 mb-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-[rgb(var(--text-muted))]">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {calculateReadingTime(post.content)} min
                        </span>
                        <span className="flex items-center gap-1 text-[rgb(var(--accent-primary))] opacity-0 group-hover:opacity-100 transition-opacity">
                          Read <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}

            {/* Explore More Card */}
            <Link href="/archive" className="group">
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-dashed border-[rgb(var(--border-color))] hover:border-[rgb(var(--accent-primary))] bg-[rgb(var(--bg-secondary))]/30 transition-all duration-300 hover:bg-[rgb(var(--accent-primary))]/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[rgb(var(--text-primary))] mb-1">
                      Explore All Posts
                    </p>
                    <p className="text-xs text-[rgb(var(--text-muted))]">
                      Discover more dream insights
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[rgb(var(--text-muted))] group-hover:text-[rgb(var(--accent-primary))] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

// Static version for reduced motion
function HeroContentStatic({ heroPost, secondaryPosts, categories }: HeroContentProps) {
  const heroConfig = heroPost ? (CATEGORY_CONFIG[heroPost.category] || defaultConfig) : defaultConfig;
  const HeroIcon = heroConfig.icon;

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Category Navigation */}
      <nav className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
        {categories.map((category) => {
          const config = CATEGORY_CONFIG[category.slug] || defaultConfig;
          const Icon = config.icon;
          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-full border transition-all"
              style={{
                borderColor: config.borderColor,
                background: `linear-gradient(135deg, ${config.accentColor}15, transparent)`,
              }}
            >
              <Icon className={`h-4 w-4 ${config.textColor}`} />
              <span className="text-[rgb(var(--text-secondary))]">{category.name}</span>
            </Link>
          );
        })}
      </nav>

      {heroPost ? (
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            <Link href={`/post/${heroPost.slug}`} className="group block h-full">
              <article
                className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden border"
                style={{ borderColor: heroConfig.borderColor }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${heroConfig.bgGradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-primary))]/90 via-[rgb(var(--bg-primary))]/50 to-transparent" />
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${heroConfig.gradient}`} />

                <div className="relative z-10 flex flex-col justify-between h-full p-5 sm:p-6 lg:p-8 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full text-white"
                      style={{ background: `linear-gradient(135deg, ${heroConfig.accentColor}, ${heroConfig.accentColor}dd)` }}
                    >
                      <HeroIcon className="h-3.5 w-3.5" />
                      {getCategoryLabel(heroPost.category)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[rgb(var(--text-primary))] leading-tight">
                      {heroPost.title}
                    </h1>
                    {heroPost.subtitle && (
                      <p className="text-sm sm:text-base lg:text-lg text-[rgb(var(--text-secondary))] line-clamp-2">
                        {heroPost.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          </div>

          {/* Secondary Posts */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {secondaryPosts.map((post) => {
              const config = CATEGORY_CONFIG[post.category] || defaultConfig;
              const Icon = config.icon;
              return (
                <Link key={post.id} href={`/post/${post.slug}`} className="group flex-1">
                  <article
                    className="h-full rounded-xl sm:rounded-2xl overflow-hidden border bg-[rgb(var(--bg-secondary))]/50"
                    style={{ borderColor: config.borderColor }}
                  >
                    <div className={`h-0.5 w-full bg-gradient-to-r ${config.gradient}`} />
                    <div className="p-4 sm:p-5">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full mb-3"
                        style={{
                          background: `${config.accentColor}18`,
                          color: config.accentColor,
                          border: `1px solid ${config.borderColor}`,
                        }}
                      >
                        <Icon className="h-3 w-3" />
                        {getCategoryLabel(post.category)}
                      </span>
                      <h2 className="text-base sm:text-lg font-semibold text-[rgb(var(--text-primary))] mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[rgb(var(--text-muted))] line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 sm:py-20 rounded-2xl sm:rounded-3xl border border-[rgb(var(--border-color))] bg-[rgb(var(--bg-secondary))]/30">
      <Moon className="h-12 w-12 sm:h-16 sm:w-16 text-[rgb(var(--accent-primary))]/40 mx-auto mb-4" />
      <h2 className="text-xl sm:text-2xl font-display font-bold text-[rgb(var(--text-primary))] mb-2">
        Dreams Loading...
      </h2>
      <p className="text-[rgb(var(--text-muted))] text-sm sm:text-base max-w-md mx-auto px-4">
        New dream stories and insights are being generated. Check back soon for fresh content.
      </p>
    </div>
  );
}
