'use client';

import { DreamscapeHero } from '@/components/three';
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
    <DreamscapeHero minHeight="auto" className="relative overflow-hidden">
      <HeroContent
        heroPost={heroPost}
        secondaryPosts={secondaryPosts}
        categories={categories}
      />
    </DreamscapeHero>
  );
}
