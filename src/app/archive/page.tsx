import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getPosts } from '@/lib/api';
import { PostCard } from '@/components/posts/PostCard';

// Enable ISR with revalidation
export const revalidate = 60;

interface PageProps {
  searchParams: { page?: string };
}

export const metadata: Metadata = {
  title: 'All Posts | Dream Insights',
  description: 'Browse all dream analysis articles, sleep science, and symbolism guides.',
};

export default async function ArchivePage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1', 10);

  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = [];
  let pagination: Awaited<ReturnType<typeof getPosts>>['pagination'] | null = null;

  try {
    const data = await getPosts(page, 12);
    posts = data.posts;
    pagination = data.pagination;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[rgb(var(--text-primary))] mb-4">
            All Posts
          </h1>
          <p className="text-lg text-[rgb(var(--text-muted))]">
            Browse all our dream stories, analysis, and insights.
          </p>
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
                    href={`/archive?page=${page - 1}`}
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
                    href={`/archive?page=${page + 1}`}
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
            <h3 className="text-xl font-semibold text-[rgb(var(--text-primary))] mb-2">
              No posts yet
            </h3>
            <p className="text-[rgb(var(--text-muted))]">
              Posts are being generated. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
