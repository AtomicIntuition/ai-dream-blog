import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Moon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/lib/api';
import { PostCard } from '@/components/posts/PostCard';
import { getCategoryLabel } from '@/lib/utils';
import {
  CATEGORY_ICONS,
  CATEGORY_DESCRIPTIONS_EXTENDED,
  VALID_CATEGORIES,
  getOgImageForCategory,
} from '@/lib/constants';

// Generate static params for all valid categories
export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category,
  }));
}

// Allow dynamic params for any new categories
export const dynamicParams = true;

// Enable ISR with revalidation - 5 minutes
export const revalidate = 300;

// Category colors with explicit hex values for reliability
const CATEGORY_GRADIENT_COLORS: Record<string, { from: string; to: string }> = {
  'dream-stories': { from: '#8b5cf6', to: '#7c3aed' },
  'dream-science': { from: '#06b6d4', to: '#0891b2' },
  'sleep-tips': { from: '#10b981', to: '#059669' },
  'symbolism': { from: '#f59e0b', to: '#d97706' },
};

interface PageProps {
  params: { category: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = params.category;

  if (!VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])) {
    return { title: 'Category Not Found' };
  }

  const title = getCategoryLabel(category);
  const description = CATEGORY_DESCRIPTIONS_EXTENDED[category];
  const ogImage = getOgImageForCategory(category);

  return {
    title: `${title} | Dream Insights`,
    description,
    openGraph: {
      title: `${title} | Dream Insights`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - Dream Insights`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Dream Insights`,
      description,
      site: '@CodeAI4Crypto',
      creator: '@CodeAI4Crypto',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - Dream Insights`,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = params;
  const page = parseInt(searchParams.page || '1', 10);

  if (!VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])) {
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

  const Icon = CATEGORY_ICONS[category] || Moon;
  const categoryName = getCategoryLabel(category);
  const description = CATEGORY_DESCRIPTIONS_EXTENDED[category];
  const gradientColors = CATEGORY_GRADIENT_COLORS[category] || { from: '#8b5cf6', to: '#7c3aed' };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            {/* Icon container with inline gradient for reliability */}
            <div
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
              }}
            >
              <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[rgb(var(--text-primary))]">
                {categoryName}
              </h1>
            </div>
          </div>
          <p className="text-base sm:text-lg text-[rgb(var(--text-muted))] max-w-2xl">{description}</p>
        </header>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <nav className="mt-8 sm:mt-12 flex justify-center gap-2">
                {pagination.hasPrevPage && (
                  <Link
                    href={`/category/${category}?page=${page - 1}`}
                    prefetch={false}
                    className="px-4 py-2 glass-card text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] transition-colors rounded-lg"
                  >
                    Previous
                  </Link>
                )}

                <span className="px-4 py-2 text-[rgb(var(--text-muted))]">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                {pagination.hasNextPage && (
                  <Link
                    href={`/category/${category}?page=${page + 1}`}
                    prefetch={false}
                    className="px-4 py-2 glass-card text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] transition-colors rounded-lg"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-12 sm:py-16 glass-card rounded-2xl">
            <Icon className="h-12 w-12 sm:h-16 sm:w-16 text-[rgb(var(--accent-primary))]/50 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-[rgb(var(--text-primary))] mb-2">
              No posts yet
            </h3>
            <p className="text-[rgb(var(--text-muted))] text-sm sm:text-base">
              Posts in this category are being created. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
