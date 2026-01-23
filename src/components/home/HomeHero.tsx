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
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br from-[rgb(var(--accent-primary))]/8 to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-tr from-[rgb(var(--accent-secondary))]/6 to-transparent blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-[300px] sm:h-[300px] rounded-full bg-gradient-to-r from-[rgb(var(--accent-tertiary))]/4 to-transparent blur-3xl animate-pulse-slow animation-delay-4000" />

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
