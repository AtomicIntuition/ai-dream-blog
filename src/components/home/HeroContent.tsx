'use client';

import Link from 'next/link';
import { ArrowRight, Moon, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthorCard } from '@/components/posts/AuthorCard';
import { formatDate, calculateReadingTime, getCategoryLabel } from '@/lib/utils';
import { CATEGORY_ICONS } from '@/lib/constants';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Category badge component with icon and color coding
function CategoryBadge({ category, size = 'default' }: { category: string; size?: 'default' | 'small' }) {
  const Icon = CATEGORY_ICONS[category] || Moon;
  const isSmall = size === 'small';

  return (
    <span className={`category-badge category-${category} ${isSmall ? 'text-xs' : ''}`}>
      <Icon className={isSmall ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      {getCategoryLabel(category)}
    </span>
  );
}

export function HeroContent({ heroPost, secondaryPosts, categories }: HeroContentProps) {
  const reducedMotion = useReducedMotion();

  // Without motion animations for reduced motion preference
  if (reducedMotion) {
    return (
      <HeroContentStatic
        heroPost={heroPost}
        secondaryPosts={secondaryPosts}
        categories={categories}
      />
    );
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 md:pt-8 md:pb-20">
      {/* Categories nav */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-10 flex-wrap"
      >
        {categories.map((category, index) => {
          const Icon = CATEGORY_ICONS[category.slug] || Moon;
          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className={`category-nav-link category-nav-${category.slug}`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      {/* Hero Grid */}
      {heroPost ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
        >
          {/* Main Featured Post */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <Link href={`/post/${heroPost.slug}`} className="group block">
              <article className="relative h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden glass-card hero-card-overlay">
                {/* Gradient background based on category */}
                <div className={`absolute inset-0 hero-gradient-${heroPost.category}`} />

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <CategoryBadge category={heroPost.category} />
                      {heroPost.generated_dream?.isLucid && (
                        <span className="px-2 py-1 text-xs font-medium bg-purple-500/30 text-purple-300 rounded-full border border-purple-400/30">
                          Lucid Dream
                        </span>
                      )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[rgb(var(--hero-text))] leading-tight group-hover:text-[rgb(var(--accent-primary))] transition-colors">
                      {heroPost.title}
                    </h1>

                    {heroPost.subtitle && (
                      <p className="text-base sm:text-lg md:text-xl text-[rgb(var(--hero-subtitle))] line-clamp-2">
                        {heroPost.subtitle}
                      </p>
                    )}

                    <div className="flex items-center gap-3 sm:gap-4 pt-1 sm:pt-2 flex-wrap">
                      <AuthorCard variant="compact" />
                      <span className="text-[rgb(var(--text-muted))] hidden sm:inline">·</span>
                      <span className="text-xs sm:text-sm text-[rgb(var(--hero-meta))]">
                        {formatDate(heroPost.published_at)}
                      </span>
                      <span className="text-[rgb(var(--text-muted))] hidden sm:inline">·</span>
                      <span className="text-xs sm:text-sm text-[rgb(var(--hero-meta))] flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {calculateReadingTime(heroPost.content)} min
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>

          {/* Secondary Posts */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-3 sm:gap-4">
            {secondaryPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                custom={index}
              >
                <Link href={`/post/${post.slug}`} className="group flex-1">
                  <article className="h-full glass-card p-4 sm:p-5 rounded-xl sm:rounded-2xl hover:border-[rgb(var(--border-hover))] transition-all hover:shadow-lg">
                    <CategoryBadge category={post.category} size="small" />
                    <h2 className="text-base sm:text-lg font-semibold text-[rgb(var(--text-primary))] mt-2.5 mb-2 group-hover:text-[rgb(var(--accent-primary))] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[rgb(var(--text-muted))] line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[rgb(var(--text-muted))]">
                      <Clock className="h-3.5 w-3.5" />
                      {calculateReadingTime(post.content)} min read
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}

            {/* Mini CTA */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-dream-500/10 to-aurora-500/10 border-dream-500/20">
                <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">
                  Decode your own dreams with AI
                </p>
                <Link
                  href="https://dreamanalysis.netlify.app"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent-primary))] hover:opacity-80 transition-colors group"
                >
                  Try Dream Analysis
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 sm:py-20 glass-card rounded-2xl sm:rounded-3xl"
        >
          <Moon className="h-12 w-12 sm:h-16 sm:w-16 text-dream-500/50 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[rgb(var(--text-primary))] mb-2">
            Dreams Loading...
          </h2>
          <p className="text-[rgb(var(--text-muted))] text-sm sm:text-base">
            New dream stories and insights are being generated. Check back soon.
          </p>
        </motion.div>
      )}
    </div>
  );
}

// Static version without animations
function HeroContentStatic({ heroPost, secondaryPosts, categories }: HeroContentProps) {
  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 md:pt-8 md:pb-20">
      <nav className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-10 flex-wrap">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.slug] || Moon;
          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`category-nav-link category-nav-${category.slug}`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{category.name}</span>
            </Link>
          );
        })}
      </nav>

      {heroPost ? (
        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            <Link href={`/post/${heroPost.slug}`} className="group block">
              <article className="relative h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden glass-card hero-card-overlay">
                <div className={`absolute inset-0 hero-gradient-${heroPost.category}`} />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CategoryBadge category={heroPost.category} />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[rgb(var(--hero-text))] leading-tight">
                      {heroPost.title}
                    </h1>
                    {heroPost.subtitle && (
                      <p className="text-base sm:text-lg md:text-xl text-[rgb(var(--hero-subtitle))] line-clamp-2">
                        {heroPost.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-3 sm:gap-4">
            {secondaryPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="group flex-1">
                <article className="h-full glass-card p-4 sm:p-5 rounded-xl sm:rounded-2xl">
                  <CategoryBadge category={post.category} size="small" />
                  <h2 className="text-base sm:text-lg font-semibold text-[rgb(var(--text-primary))] mt-2.5 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[rgb(var(--text-muted))] line-clamp-2">
                    {post.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 sm:py-20 glass-card rounded-2xl sm:rounded-3xl">
          <Moon className="h-12 w-12 sm:h-16 sm:w-16 text-dream-500/50 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-display font-bold">Dreams Loading...</h2>
        </div>
      )}
    </div>
  );
}
