import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Moon, Brain, Bed, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getCategories } from '@/lib/api';
import { PostCard } from '@/components/posts/PostCard';
import { getCategoryLabel } from '@/lib/utils';

interface PageProps {
  params: { category: string };
  searchParams: { page?: string };
}

const categoryIcons: Record<string, React.ElementType> = {
  'dream-stories': Moon,
  'dream-science': Brain,
  'sleep-tips': Bed,
  'symbolism': Sparkles,
};

const categoryDescriptions: Record<string, string> = {
  'dream-stories': 'Explore fascinating dreams analyzed by AI, uncovering hidden meanings and psychological insights.',
  'dream-science': 'Discover the neuroscience and psychology behind why we dream and what happens in our sleeping minds.',
  'sleep-tips': 'Practical advice for better sleep, dream recall, and optimizing your nighttime routine.',
  'symbolism': 'Learn the meanings of common dream symbols and how to interpret the messages from your subconscious.',
};

const validCategories = ['dream-stories', 'dream-science', 'sleep-tips', 'symbolism'];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = params.category;

  if (!validCategories.includes(category)) {
    return { title: 'Category Not Found' };
  }

  const title = getCategoryLabel(category);
  const description = categoryDescriptions[category];

  return {
    title: `${title} | Dream Insights`,
    description,
    openGraph: {
      title: `${title} | Dream Insights`,
      description,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = params;
  const page = parseInt(searchParams.page || '1', 10);

  if (!validCategories.includes(category)) {
    notFound();
  }

  let posts: Awaited<ReturnType<typeof getPostsByCategory>>['posts'] = [];
  let pagination: Awaited<ReturnType<typeof getPostsByCategory>>['pagination'] | null = null;

  try {
    const data = await getPostsByCategory(category, page, 12);
    posts = data.posts;
    pagination = data.pagination;
  } catch (error) {
    console.error('Error fetching category posts:', error);
  }

  const Icon = categoryIcons[category] || Moon;
  const categoryName = getCategoryLabel(category);
  const description = categoryDescriptions[category];

  const categoryColors: Record<string, string> = {
    'dream-stories': 'from-dream-500 to-dream-600',
    'dream-science': 'from-cyan-500 to-cyan-600',
    'sleep-tips': 'from-emerald-500 to-emerald-600',
    'symbolism': 'from-amber-500 to-amber-600',
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`p-4 rounded-2xl bg-gradient-to-br ${categoryColors[category]}`}
            >
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
                {categoryName}
              </h1>
            </div>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl">{description}</p>
        </header>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <nav className="mt-12 flex justify-center gap-2">
                {pagination.hasPrevPage && (
                  <Link
                    href={`/category/${category}?page=${page - 1}`}
                    className="px-4 py-2 glass-card hover:bg-white/10 transition-colors"
                  >
                    Previous
                  </Link>
                )}

                <span className="px-4 py-2 text-slate-400">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                {pagination.hasNextPage && (
                  <Link
                    href={`/category/${category}?page=${page + 1}`}
                    className="px-4 py-2 glass-card hover:bg-white/10 transition-colors"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-16 glass-card">
            <Icon className="h-16 w-16 text-dream-500/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No posts yet
            </h3>
            <p className="text-slate-400">
              Posts in this category are being created. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
