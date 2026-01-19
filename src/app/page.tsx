import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Moon, Brain, Bed, Sparkles, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { PostCard } from '@/components/posts/PostCard';
import { AuthorCard } from '@/components/posts/AuthorCard';
import { getPosts, getCategories, getFeaturedPosts } from '@/lib/api';
import { formatDate, calculateReadingTime, getCategoryLabel } from '@/lib/utils';
import { AUTHOR } from '@/lib/author';

// Revalidate every 60 seconds for fresh content
export const revalidate = 60;

const baseUrl = 'https://ai-dream-blog.vercel.app';

export const metadata: Metadata = {
  title: 'Dream Insights | AI-Powered Dream Analysis Blog',
  description: 'Explore the fascinating world of dreams through AI-powered analysis, dream interpretation, sleep science, and symbolism guides by Luna Vale.',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Dream Insights | AI-Powered Dream Analysis Blog',
    description: 'Explore the fascinating world of dreams through AI-powered analysis, dream interpretation, sleep science, and symbolism guides.',
    url: baseUrl,
    type: 'website',
    siteName: 'Dream Insights',
    locale: 'en_US',
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
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
        url: `${baseUrl}/twitter-image`,
        width: 1200,
        height: 630,
        alt: 'Dream Insights by Luna Vale - AI Dream Analysis',
      },
    ],
  },
};

const categoryIcons: Record<string, React.ElementType> = {
  'dream-stories': Moon,
  'dream-science': Brain,
  'sleep-tips': Bed,
  'symbolism': Sparkles,
};

const categoryDescriptions: Record<string, string> = {
  'dream-stories': 'AI-analyzed dreams with deep psychological insights',
  'dream-science': 'The neuroscience and psychology behind dreaming',
  'sleep-tips': 'Practical advice for better sleep and dream recall',
  'symbolism': 'Decode the hidden meanings in your dreams',
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
      {/* Hero Section - Featured Post Focus */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-dream-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-aurora-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Bar - Categories */}
          <nav className="flex items-center justify-center gap-1 mb-12 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug] || Moon;
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

          {/* Hero Content Grid */}
          {heroPost ? (
            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Main Featured Post */}
              <div className="lg:col-span-3">
                <Link href={`/post/${heroPost.slug}`} className="group block">
                  <article className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden glass-card hero-card-overlay">
                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-dream-500/20 via-aurora-500/10 to-cosmic-500/10" />

                    {/* Content */}
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
              </div>

              {/* Secondary Posts */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {secondaryPosts.map((post) => (
                  <Link key={post.id} href={`/post/${post.slug}`} className="group flex-1">
                    <article className="h-full glass-card p-5 rounded-2xl hover:border-[rgb(var(--border-hover))] transition-all">
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
                ))}

                {/* Mini CTA */}
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
              </div>
            </div>
          ) : (
            <div className="text-center py-20 glass-card rounded-3xl">
              <Moon className="h-16 w-16 text-dream-500/50 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold text-[rgb(var(--text-primary))] mb-2">
                Dreams Loading...
              </h2>
              <p className="text-[rgb(var(--text-muted))]">
                New dream stories and insights are being generated. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Section */}
      {featuredPosts.length > 0 && (
        <section className="py-12 border-y border-[rgb(var(--border-color))] bg-[rgb(var(--glass-bg))]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-[rgb(var(--accent-primary))]" />
              <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]">Trending</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="group flex items-start gap-4">
                  <span className="text-4xl font-display font-bold text-[rgb(var(--accent-primary))]/30 group-hover:text-[rgb(var(--accent-primary))]/50 transition-colors">
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
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts Grid */}
      <section id="latest" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

          {remainingPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-[rgb(var(--text-muted))] text-center py-12">
              More posts coming soon...
            </p>
          )}
        </div>
      </section>

      {/* Categories Deep Dive */}
      <section className="py-16 border-t border-[rgb(var(--border-color))]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[rgb(var(--text-primary))] mb-10">
            Explore by Topic
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug] || Moon;
              const description = categoryDescriptions[category.slug] || '';

              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group glass-card p-6 rounded-2xl hover:border-[rgb(var(--border-hover))] transition-all flex items-start gap-4"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${
                    category.slug === 'dream-stories' ? 'from-dream-500/20 to-dream-600/20' :
                    category.slug === 'dream-science' ? 'from-cyan-500/20 to-cyan-600/20' :
                    category.slug === 'sleep-tips' ? 'from-emerald-500/20 to-emerald-600/20' :
                    'from-amber-500/20 to-amber-600/20'
                  }`}>
                    <Icon className="h-6 w-6 text-[rgb(var(--text-primary))]" />
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
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section className="py-16 border-t border-[rgb(var(--border-color))]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-dream-500 via-aurora-500 to-cosmic-500 mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-display font-bold text-[rgb(var(--text-primary))] mb-3">
            Meet {AUTHOR.name}
          </h2>
          <p className="text-[rgb(var(--text-muted))] mb-6 max-w-xl mx-auto">
            {AUTHOR.fullBio}
          </p>
          <a
            href={`https://twitter.com/${AUTHOR.social.twitter.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[rgb(var(--accent-primary))] hover:opacity-80 transition-colors"
          >
            Follow on Twitter
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden cta-card">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-dream-600/30 via-aurora-600/20 to-cosmic-600/30" />
            <div className="absolute inset-0 backdrop-blur-3xl" />

            {/* Content */}
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
                className="btn-primary inline-flex text-lg px-8 py-4"
              >
                Analyze Your Dreams Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
