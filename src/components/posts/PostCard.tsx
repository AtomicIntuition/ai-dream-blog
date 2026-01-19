import { memo, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Eye } from 'lucide-react';
import { cn, formatDate, calculateReadingTime, getCategoryLabel } from '@/lib/utils';
import type { BlogPost } from '@/lib/api';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const PostCard = memo(function PostCard({ post, featured = false }: PostCardProps) {
  const readingTime = calculateReadingTime(post.content);

  return (
    <article
      className={cn(
        'group glass-card overflow-hidden transition-all duration-300',
        'hover:border-[rgb(var(--border-hover))] hover:shadow-lg hover:shadow-[rgb(var(--glow-color))]',
        featured && 'md:col-span-2'
      )}
    >
      <Link href={`/post/${post.slug}`} className="block">
        {/* Card content */}
        <div className={cn('p-6', featured && 'md:p-8')}>
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`category-badge category-${post.category}`}>
              {getCategoryLabel(post.category)}
            </span>
            {post.generated_dream?.isLucid && (
              <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                Lucid
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            className={cn(
              'font-display font-bold text-[rgb(var(--text-primary))] mb-3 group-hover:text-[rgb(var(--accent-primary))] transition-colors',
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            )}
          >
            {post.title}
          </h2>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-[rgb(var(--text-muted))] text-sm mb-3 line-clamp-1">
              {post.subtitle}
            </p>
          )}

          {/* Excerpt */}
          <p
            className={cn(
              'text-[rgb(var(--text-secondary))] mb-4',
              featured ? 'line-clamp-3' : 'line-clamp-2'
            )}
          >
            {post.excerpt}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-[rgb(var(--text-muted))]">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </span>
            {post.view_count > 0 && (
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {post.view_count.toLocaleString()}
              </span>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-[rgb(var(--glass-bg))] text-[rgb(var(--text-muted))] rounded border border-[rgb(var(--border-color))]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
});

PostCard.displayName = 'PostCard';
