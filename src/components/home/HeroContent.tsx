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

// Category icons only - colors come from theme accent
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'dream-stories': Moon,
  'dream-science': Brain,
  'sleep-tips': Bed,
  'symbolism': Sparkles,
};

const defaultIcon = Moon;

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

  const HeroIcon = heroPost ? (CATEGORY_ICONS[heroPost.category] || defaultIcon) : defaultIcon;

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Editorial Masthead */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-10"
      >
        <h1 className="blog-title mb-3">Dream Insights</h1>
        <p className="text-[rgb(var(--text-secondary))] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          AI-powered dream analysis, sleep science, and the hidden language of your subconscious
        </p>
        <div className="mx-auto mt-5 h-px w-12 bg-[rgb(var(--accent-primary))] opacity-40" />
      </motion.div>

      {/* Category Navigation - unified accent color */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap"
      >
        {categories.map((category, index) => {
          const Icon = CATEGORY_ICONS[category.slug] || defaultIcon;
          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
            >
              <Link
                href={`/category/${category.slug}`}
                prefetch={false}
                className="group flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-full border border-[rgba(var(--accent-primary),0.2)] bg-[rgba(var(--accent-primary),0.06)] transition-all duration-300 hover:scale-105 hover:bg-[rgba(var(--accent-primary),0.12)] hover:border-[rgba(var(--accent-primary),0.3)]"
              >
                <Icon className="h-4 w-4 text-[rgb(var(--accent-primary))]" />
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
          className="grid lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-start"
        >
          {/* Featured Post - Large Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href={`/post/${heroPost.slug}`} prefetch={false} className="group block">
              <article className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[rgba(var(--accent-primary),0.2)] transition-all duration-500 hover:shadow-2xl hover:border-[rgba(var(--accent-primary),0.3)]">
                {/* Subtle accent gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--accent-primary),0.08)] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-primary))]/90 via-[rgb(var(--bg-primary))]/50 to-transparent" />

                {/* Accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent-primary))]" />

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-6 lg:p-8">
                  {/* Top section - badges */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      {/* Category badge */}
                      <span className="category-badge">
                        <HeroIcon className="h-3.5 w-3.5" />
                        {getCategoryLabel(heroPost.category)}
                      </span>
                      {heroPost.generated_dream?.isLucid && (
                        <span className="px-2.5 py-1 text-xs font-medium bg-[rgba(var(--accent-primary),0.15)] text-[rgb(var(--accent-primary))] rounded-full border border-[rgba(var(--accent-primary),0.25)]">
                          Lucid
                        </span>
                      )}
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-[rgb(var(--text-muted))]">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Featured
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[rgb(var(--text-primary))] leading-tight group-hover:text-[rgb(var(--accent-primary))] transition-colors">
                      {heroPost.title}
                    </h2>

                    {heroPost.subtitle && (
                      <p className="text-sm sm:text-base lg:text-lg text-[rgb(var(--text-secondary))] line-clamp-2">
                        {heroPost.subtitle}
                      </p>
                    )}

                    <p className="text-sm text-[rgb(var(--text-muted))] line-clamp-3 leading-relaxed">
                      {heroPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4 pt-2">
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
                      <span className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent-primary))] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Read Article <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_100%,rgba(var(--accent-primary),0.1),transparent_60%)]" />
              </article>
            </Link>
          </motion.div>

          {/* Secondary Posts Column */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:gap-5">
            {secondaryPosts.map((post) => {
              const Icon = CATEGORY_ICONS[post.category] || defaultIcon;

              return (
                <Link key={post.id} href={`/post/${post.slug}`} className="group flex-1">
                  <article className="h-full rounded-xl sm:rounded-2xl overflow-hidden border border-[rgba(var(--accent-primary),0.15)] bg-[rgb(var(--bg-secondary))]/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-[rgba(var(--accent-primary),0.25)]">
                    {/* Accent line */}
                    <div className="h-0.5 w-full bg-[rgb(var(--accent-primary))]" />

                    <div className="p-4 sm:p-5">
                      {/* Category badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="category-badge">
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
                        <span className="flex items-center gap-3">
                          <span>{formatDate(post.published_at)}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {calculateReadingTime(post.content)} min
                          </span>
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
            <Link href="/archive" prefetch={false} className="group">
              <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-dashed border-[rgb(var(--border-color))] hover:border-[rgb(var(--accent-primary))] bg-[rgb(var(--bg-secondary))]/30 transition-all duration-300 hover:bg-[rgba(var(--accent-primary),0.05)]">
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
  const HeroIcon = heroPost ? (CATEGORY_ICONS[heroPost.category] || defaultIcon) : defaultIcon;

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Editorial Masthead */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="blog-title mb-3">Dream Insights</h1>
        <p className="text-[rgb(var(--text-secondary))] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          AI-powered dream analysis, sleep science, and the hidden language of your subconscious
        </p>
        <div className="mx-auto mt-5 h-px w-12 bg-[rgb(var(--accent-primary))] opacity-40" />
      </div>

      {/* Category Navigation - unified accent */}
      <nav className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.slug] || defaultIcon;
          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              prefetch={false}
              className="group flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-full border border-[rgba(var(--accent-primary),0.2)] bg-[rgba(var(--accent-primary),0.06)] transition-all hover:bg-[rgba(var(--accent-primary),0.12)]"
            >
              <Icon className="h-4 w-4 text-[rgb(var(--accent-primary))]" />
              <span className="text-[rgb(var(--text-secondary))]">{category.name}</span>
            </Link>
          );
        })}
      </nav>

      {heroPost ? (
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-start">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            <Link href={`/post/${heroPost.slug}`} prefetch={false} className="group block">
              <article className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[rgba(var(--accent-primary),0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--accent-primary),0.08)] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-primary))]/90 via-[rgb(var(--bg-primary))]/50 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent-primary))]" />

                <div className="relative z-10 p-5 sm:p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="flex items-center gap-2">
                      <span className="category-badge">
                        <HeroIcon className="h-3.5 w-3.5" />
                        {getCategoryLabel(heroPost.category)}
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-[rgb(var(--text-muted))]">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Featured
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[rgb(var(--text-primary))] leading-tight">
                      {heroPost.title}
                    </h2>
                    {heroPost.subtitle && (
                      <p className="text-sm sm:text-base lg:text-lg text-[rgb(var(--text-secondary))] line-clamp-2">
                        {heroPost.subtitle}
                      </p>
                    )}
                    <p className="text-sm text-[rgb(var(--text-muted))] line-clamp-3 leading-relaxed">
                      {heroPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4 pt-2">
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
                      <span className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent-primary))]">
                        Read Article <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>

          {/* Secondary Posts */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {secondaryPosts.map((post) => {
              const Icon = CATEGORY_ICONS[post.category] || defaultIcon;
              return (
                <Link key={post.id} href={`/post/${post.slug}`} className="group flex-1">
                  <article className="h-full rounded-xl sm:rounded-2xl overflow-hidden border border-[rgba(var(--accent-primary),0.15)] bg-[rgb(var(--bg-secondary))]/50">
                    <div className="h-0.5 w-full bg-[rgb(var(--accent-primary))]" />
                    <div className="p-4 sm:p-5">
                      <span className="category-badge mb-3">
                        <Icon className="h-3 w-3" />
                        {getCategoryLabel(post.category)}
                      </span>
                      <h2 className="text-base sm:text-lg font-semibold text-[rgb(var(--text-primary))] mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[rgb(var(--text-muted))] line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[rgb(var(--text-muted))]">
                        <span>{formatDate(post.published_at)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {calculateReadingTime(post.content)} min
                        </span>
                      </div>
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
