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
  CATEGORY_COLORS,
  VALID_CATEGORIES,
} from '@/lib/constants';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`p-4 rounded-2xl bg-gradient-to-br ${CATEGORY_COLORS[category]}`}
            >
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-[rgb(var(--text-primary))]">
                {categoryName}
              </h1>
            </div>
          </div>
          <p className="text-lg text-[rgb(var(--text-muted))] max-w-2xl">{description}</p>
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
                    className="px-4 py-2 glass-card text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] transition-colors"
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
                    className="px-4 py-2 glass-card text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] transition-colors"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-16 glass-card">
            <Icon className="h-16 w-16 text-[rgb(var(--accent-primary))]/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[rgb(var(--text-primary))] mb-2">
              No posts yet
            </h3>
            <p className="text-[rgb(var(--text-muted))]">
              Posts in this category are being created. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
