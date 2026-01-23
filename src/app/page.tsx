import { Metadata } from 'next';
import { getPosts, getCategories, getFeaturedPosts } from '@/lib/api';
import { SITE_URL } from '@/lib/constants';
import {
  HomeHero,
  FeatureShowcase,
  TrendingSection,
  LatestPostsSection,
  CategoriesSection,
  AuthorSection,
  CTASection,
  StatsSection,
} from '@/components/home';

// Revalidate every 60 seconds for fresh content
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Dream Insights | AI-Powered Dream Analysis Blog',
  description: 'Explore the fascinating world of dreams through AI-powered analysis, dream interpretation, sleep science, and symbolism guides by Luna Vale.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Dream Insights | AI-Powered Dream Analysis Blog',
    description: 'Explore the fascinating world of dreams through AI-powered analysis, dream interpretation, sleep science, and symbolism guides.',
    url: SITE_URL,
    type: 'website',
    siteName: 'Dream Insights',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/images/ai-dream-blog.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dream Insights by Luna Vale - AI Dream Analysis',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@CodeAI4Crypto',
    creator: '@CodeAI4Crypto',
    title: 'Dream Insights | AI-Powered Dream Analysis Blog',
    description: 'Explore the fascinating world of dreams through AI-powered analysis, dream interpretation, sleep science, and symbolism guides.',
    images: [
      {
        url: `${SITE_URL}/images/ai-dream-blog.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dream Insights by Luna Vale - AI Dream Analysis',
      },
    ],
  },
};

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = [];
  let categories: Awaited<ReturnType<typeof getCategories>>['categories'] = [];
  let featuredPosts: Awaited<ReturnType<typeof getFeaturedPosts>>['posts'] = [];

  try {
    const [postsData, categoriesData, featuredData] = await Promise.all([
      getPosts(1, 12),
      getCategories(),
      getFeaturedPosts(3),
    ]);
    posts = postsData.posts;
    categories = categoriesData.categories;
    featuredPosts = featuredData.posts;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const heroPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);
  const remainingPosts = posts.slice(3, 9);

  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Dreamscape Background */}
      <HomeHero
        heroPost={heroPost}
        secondaryPosts={secondaryPosts}
        categories={categories}
      />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Trending Section */}
      <TrendingSection posts={featuredPosts} />

      {/* Stats Section */}
      <StatsSection />

      {/* Latest Posts Grid */}
      <LatestPostsSection posts={remainingPosts} />

      {/* Categories Deep Dive */}
      <CategoriesSection categories={categories} />

      {/* About the Author */}
      <AuthorSection />

      {/* Final CTA */}
      <CTASection />
    </div>
  );
}
