'use client';

import Link from 'next/link';
import { ArrowRight, Moon, TrendingUp, ChevronRight, Sparkles } from 'lucide-react';
import { PostCard } from '@/components/posts/PostCard';
import { ScrollReveal, RevealUp, RevealLeft, StaggerGrid, AnimatedCounter } from '@/components/animations';
import { formatDate, calculateReadingTime, getCategoryLabel } from '@/lib/utils';
import { AUTHOR } from '@/lib/author';
import { CATEGORY_ICONS, CATEGORY_DESCRIPTIONS } from '@/lib/constants';
import type { BlogPost } from '@/lib/api';

interface Category {
  slug: string;
  name: string;
  post_count?: number;
}

interface TrendingSectionProps {
  posts: BlogPost[];
}

export function TrendingSection({ posts }: TrendingSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-12 border-y border-[rgb(var(--border-color))] bg-[rgb(var(--glass-bg))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealLeft delay={0.1}>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-[rgb(var(--accent-primary))]" />
            <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]">Trending</h2>
          </div>
        </RevealLeft>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <ScrollReveal key={post.id} direction="right" delay={0.1 + index * 0.1}>
              <Link href={`/post/${post.slug}`} prefetch={false} className="group flex items-start gap-4">
                <span className="text-4xl font-display font-bold text-[rgb(var(--text-muted))] group-hover:text-[rgb(var(--accent-primary))] transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--accent-primary))] transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[rgb(var(--text-muted))]">
                    {post.view_count?.toLocaleString() || 0} views
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface LatestPostsSectionProps {
  posts: BlogPost[];
}

export function LatestPostsSection({ posts }: LatestPostsSectionProps) {
  return (
    <section id="latest" className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealUp>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[rgb(var(--text-primary))]">
              Latest Insights
            </h2>
            <Link
              href="/archive"
              className="flex items-center gap-1 text-sm font-medium text-[rgb(var(--accent-primary))] hover:opacity-80 transition-colors"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealUp>

        {posts.length > 0 ? (
          <StaggerGrid className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </StaggerGrid>
        ) : (
          <RevealUp>
            <p className="text-[rgb(var(--text-muted))] text-center py-12">
              More posts coming soon...
            </p>
          </RevealUp>
        )}
      </div>
    </section>
  );
}

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-16 border-t border-[rgb(var(--border-color))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealUp>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[rgb(var(--text-primary))] mb-10">
            Explore by Topic
          </h2>
        </RevealUp>

        <StaggerGrid className="grid md:grid-cols-2 gap-4" staggerDelay={0.1}>
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug] || Moon;
            const description = CATEGORY_DESCRIPTIONS[category.slug] || '';

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                prefetch={false}
                className="group glass-card p-6 rounded-2xl hover:border-[rgb(var(--border-hover))] transition-all flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-[rgba(var(--accent-primary),0.12)]">
                  <Icon className="h-6 w-6 text-[rgb(var(--accent-primary))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--accent-primary))] transition-colors">
                      {category.name}
                    </h3>
                    <ChevronRight className="h-4 w-4 text-[rgb(var(--text-muted))] group-hover:text-[rgb(var(--accent-primary))] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-sm text-[rgb(var(--text-muted))] mb-2">
                    {description}
                  </p>
                  <span className="text-xs text-[rgb(var(--text-muted))]">
                    {category.post_count || 0} articles
                  </span>
                </div>
              </Link>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}

export function AuthorSection() {
  return (
    <section className="py-16 border-t border-[rgb(var(--border-color))]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <RevealUp>
          <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-dream-500 via-aurora-500 to-cosmic-500 mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </RevealUp>

        <RevealUp delay={0.1}>
          <h2 className="text-2xl font-display font-bold text-[rgb(var(--text-primary))] mb-3">
            Meet {AUTHOR.name}
          </h2>
        </RevealUp>

        <RevealUp delay={0.2}>
          <p className="text-[rgb(var(--text-muted))] mb-6 max-w-xl mx-auto">
            {AUTHOR.fullBio}
          </p>
        </RevealUp>

        <RevealUp delay={0.3}>
          <a
            href={`https://twitter.com/${AUTHOR.social.twitter.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[rgb(var(--accent-primary))] hover:opacity-80 transition-colors"
          >
            Follow on Twitter
            <ArrowRight className="h-4 w-4" />
          </a>
        </RevealUp>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={40}>
          <div className="relative rounded-3xl overflow-hidden cta-card">
            <div className="absolute inset-0 bg-gradient-to-br from-dream-600/30 via-aurora-600/20 to-cosmic-600/30" />
            <div className="absolute inset-0 backdrop-blur-3xl" />

            <div className="relative py-16 px-8 md:py-20 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[rgb(var(--cta-heading))] mb-4">
                What Do Your Dreams Mean?
              </h2>
              <p className="text-lg text-[rgb(var(--cta-text))] max-w-2xl mx-auto mb-8">
                Get instant AI-powered analysis of your dreams. Understand the symbols,
                emotions, and messages your subconscious is sending you.
              </p>
              <Link
                href="https://dreamanalysis.netlify.app"
                className="button-primary inline-flex text-lg px-8 py-4 animate-glow-pulse"
              >
                Analyze Your Dreams Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

interface StatsSectionProps {
  dreamCount?: number;
  userCount?: number;
  analysisCount?: number;
}

export function StatsSection({
  dreamCount = 10000,
  userCount = 5000,
  analysisCount = 25000,
}: StatsSectionProps) {
  return (
    <section className="py-12 border-t border-[rgb(var(--border-color))]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8 text-center">
          <RevealUp delay={0}>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-[rgb(var(--accent-primary))]">
                <AnimatedCounter value={dreamCount} suffix="+" duration={2} />
              </div>
              <div className="text-sm text-[rgb(var(--text-muted))] mt-1">Dreams Analyzed</div>
            </div>
          </RevealUp>

          <RevealUp delay={0.1}>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-[rgb(var(--accent-primary))]">
                <AnimatedCounter value={userCount} suffix="+" duration={2} />
              </div>
              <div className="text-sm text-[rgb(var(--text-muted))] mt-1">Dream Explorers</div>
            </div>
          </RevealUp>

          <RevealUp delay={0.2}>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-[rgb(var(--accent-primary))]">
                <AnimatedCounter value={analysisCount} suffix="+" duration={2} />
              </div>
              <div className="text-sm text-[rgb(var(--text-muted))] mt-1">AI Insights</div>
            </div>
          </RevealUp>
        </div>
      </div>
    </section>
  );
}
