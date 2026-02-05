'use client';

import { HeroContent } from './HeroContent';

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

interface HomeHeroProps {
  heroPost?: Post;
  secondaryPosts: Post[];
  categories: Category[];
}

export function HomeHero({ heroPost, secondaryPosts, categories }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[rgb(var(--bg-primary))]">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top gradient fade for depth */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[rgb(var(--bg-primary))] to-transparent" />

        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 sm:w-[560px] sm:h-[560px] rounded-full bg-gradient-to-br from-[rgb(var(--accent-primary))]/10 to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[rgb(var(--accent-secondary))]/8 to-transparent blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[360px] sm:h-[360px] rounded-full bg-gradient-to-r from-[rgb(var(--accent-tertiary))]/5 to-transparent blur-3xl animate-pulse-slow animation-delay-4000" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgb(var(--text-primary)) 1px, transparent 1px),
              linear-gradient(90deg, rgb(var(--text-primary)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <HeroContent
        heroPost={heroPost}
        secondaryPosts={secondaryPosts}
        categories={categories}
      />
    </section>
  );
}
