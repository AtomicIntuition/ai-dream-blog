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
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Categories nav */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-1 mb-12 overflow-x-auto pb-2 scrollbar-hide"
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
                className="flex items-center gap-2 px-4 py-2 text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] rounded-full transition-all whitespace-nowrap"
              >
                <Icon className="h-4 w-4" />
                {category.name}
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
          className="grid lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {/* Main Featured Post */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <Link href={`/post/${heroPost.slug}`} className="group block">
              <article className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden glass-card hero-card-overlay">
                <div className="absolute inset-0 bg-gradient-to-br from-dream-500/20 via-aurora-500/10 to-cosmic-500/10" />

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 pt-8 md:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`category-badge category-${heroPost.category}`}>
                        {getCategoryLabel(heroPost.category)}
                      </span>
                      {heroPost.generated_dream?.isLucid && (
                        <span className="px-2 py-1 text-xs bg-purple-500/30 text-purple-300 rounded-full">
                          Lucid
                        </span>
                      )}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[rgb(var(--hero-text))] leading-tight group-hover:text-[rgb(var(--accent-primary))] transition-colors">
                      {heroPost.title}
                    </h1>

                    {heroPost.subtitle && (
                      <p className="text-lg md:text-xl text-[rgb(var(--hero-subtitle))] line-clamp-2">
                        {heroPost.subtitle}
                      </p>
                    )}

                    <div className="flex items-center gap-4 pt-2">
                      <AuthorCard variant="compact" />
                      <span className="text-[rgb(var(--text-muted))]">·</span>
                      <span className="text-sm text-[rgb(var(--hero-meta))]">
                        {formatDate(heroPost.published_at)}
                      </span>
                      <span className="text-[rgb(var(--text-muted))]">·</span>
                      <span className="text-sm text-[rgb(var(--hero-meta))]">
                        {calculateReadingTime(heroPost.content)} min read
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>

          {/* Secondary Posts */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-4">
            {secondaryPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                custom={index}
              >
                <Link href={`/post/${post.slug}`} className="group flex-1">
                  <article className="h-full glass-card p-5 rounded-2xl hover:border-[rgb(var(--border-hover))]">
                    <span className={`category-badge category-${post.category} text-xs mb-3`}>
                      {getCategoryLabel(post.category)}
                    </span>
                    <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))] mb-2 group-hover:text-[rgb(var(--accent-primary))] transition-colors line-clamp-2">
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
              <div className="glass-card p-5 rounded-2xl bg-gradient-to-br from-dream-500/10 to-aurora-500/10">
                <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">
                  Decode your own dreams with AI
                </p>
                <Link
                  href="https://dreamanalysis.netlify.app"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent-primary))] hover:opacity-80 transition-colors"
                >
                  Try Dream Analysis
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 glass-card rounded-3xl"
        >
          <Moon className="h-16 w-16 text-dream-500/50 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-[rgb(var(--text-primary))] mb-2">
            Dreams Loading...
          </h2>
          <p className="text-[rgb(var(--text-muted))]">
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
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-24">
      <nav className="flex items-center justify-center gap-1 mb-12 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.slug] || Moon;
          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] rounded-full transition-all whitespace-nowrap"
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </Link>
          );
        })}
      </nav>

      {heroPost ? (
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            <Link href={`/post/${heroPost.slug}`} className="group block">
              <article className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden glass-card hero-card-overlay">
                <div className="absolute inset-0 bg-gradient-to-br from-dream-500/20 via-aurora-500/10 to-cosmic-500/10" />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 pt-8 md:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`category-badge category-${heroPost.category}`}>
                        {getCategoryLabel(heroPost.category)}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[rgb(var(--hero-text))] leading-tight">
                      {heroPost.title}
                    </h1>
                    {heroPost.subtitle && (
                      <p className="text-lg md:text-xl text-[rgb(var(--hero-subtitle))] line-clamp-2">
                        {heroPost.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {secondaryPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="group flex-1">
                <article className="h-full glass-card p-5 rounded-2xl">
                  <span className={`category-badge category-${post.category} text-xs mb-3`}>
                    {getCategoryLabel(post.category)}
                  </span>
                  <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))] mb-2 line-clamp-2">
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
        <div className="text-center py-20 glass-card rounded-3xl">
          <Moon className="h-16 w-16 text-dream-500/50 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold">Dreams Loading...</h2>
        </div>
      )}
    </div>
  );
}
