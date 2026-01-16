import Link from 'next/link';
import { ArrowRight, Moon, Brain, Bed, Sparkles } from 'lucide-react';
import { PostCard } from '@/components/posts/PostCard';
import { getPosts, getCategories } from '@/lib/api';

const categoryIcons: Record<string, React.ElementType> = {
  'dream-stories': Moon,
  'dream-science': Brain,
  'sleep-tips': Bed,
  'symbolism': Sparkles,
};

const categoryColors: Record<string, string> = {
  'dream-stories': 'from-dream-500 to-dream-600',
  'dream-science': 'from-cyan-500 to-cyan-600',
  'sleep-tips': 'from-emerald-500 to-emerald-600',
  'symbolism': 'from-amber-500 to-amber-600',
};

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = [];
  let categories: Awaited<ReturnType<typeof getCategories>>['categories'] = [];

  try {
    const [postsData, categoriesData] = await Promise.all([
      getPosts(1, 12),
      getCategories(),
    ]);
    posts = postsData.posts;
    categories = categoriesData.categories;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dream-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aurora-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="blog-title text-4xl md:text-6xl lg:text-7xl mb-6">
            Unlock the Secrets<br />of Your Dreams
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-8">
            Explore AI-analyzed dreams, discover the science of sleep, and learn to interpret
            the hidden messages in your subconscious mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#latest"
              className="btn-primary"
            >
              Explore Dreams
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="https://dreamanalysis.netlify.app"
              className="btn-secondary"
            >
              Try the App
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug] || Moon;
              const gradient = categoryColors[category.slug] || 'from-dream-500 to-dream-600';

              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group glass-card p-6 hover:border-white/20 transition-all"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-dream-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {category.post_count || 0} articles
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section id="latest" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Latest Insights
            </h2>
            <Link
              href="/archive"
              className="text-dream-400 hover:text-dream-300 flex items-center gap-1 text-sm font-medium"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Featured post */}
              {featuredPost && (
                <div className="md:col-span-2 lg:col-span-2">
                  <PostCard post={featuredPost} featured />
                </div>
              )}

              {/* Regular posts */}
              {remainingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass-card">
              <Moon className="h-16 w-16 text-dream-500/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No posts yet
              </h3>
              <p className="text-slate-400">
                Dream stories and insights are being generated. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-dream-500/10 to-aurora-500/10" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Analyze Your Own Dreams
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
                Get personalized AI-powered dream analysis. Record your dreams,
                discover patterns, and unlock insights about your subconscious mind.
              </p>
              <Link
                href="https://dreamanalysis.netlify.app"
                className="btn-primary inline-flex"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
