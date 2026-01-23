import { memo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Eye, Moon, Brain, Bed, Sparkles } from 'lucide-react';
import { cn, formatDate, calculateReadingTime, getCategoryLabel } from '@/lib/utils';
import type { BlogPost } from '@/lib/api';

// Inline icon mapping to avoid import issues
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'dream-stories': Moon,
  'dream-science': Brain,
  'sleep-tips': Bed,
  'symbolism': Sparkles,
};

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const PostCard = memo(function PostCard({ post, featured = false }: PostCardProps) {
  const readingTime = calculateReadingTime(post.content);
  const Icon = CATEGORY_ICONS[post.category] || Moon;

  return (
    <article
      className={cn(
        'group glass-card overflow-hidden transition-all duration-300',
        'hover:border-[rgb(var(--border-hover))] hover:shadow-xl hover:-translate-y-0.5',
        featured && 'md:col-span-2'
      )}
    >
      <Link href={`/post/${post.slug}`} className="block h-full">
        {/* Top accent line based on category */}
        <div className={cn(
          'h-1 w-full',
          post.category === 'dream-stories' && 'bg-gradient-to-r from-violet-500 to-purple-500',
          post.category === 'dream-science' && 'bg-gradient-to-r from-cyan-500 to-blue-500',
          post.category === 'sleep-tips' && 'bg-gradient-to-r from-emerald-500 to-green-500',
          post.category === 'symbolism' && 'bg-gradient-to-r from-amber-500 to-orange-500',
        )} />

        {/* Card content */}
        <div className={cn('p-5 sm:p-6', featured && 'md:p-8')}>
          {/* Category badge with icon */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`category-badge category-${post.category}`}>
              <Icon className="h-3.5 w-3.5" />
              {getCategoryLabel(post.category)}
            </span>
            {post.generated_dream?.isLucid && (
              <span className="px-2.5 py-1 text-xs font-medium bg-purple-500/15 text-purple-400 rounded-full border border-purple-500/20">
                Lucid
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            className={cn(
              'font-display text-[rgb(var(--text-primary))] mb-3 group-hover:text-[rgb(var(--accent-primary))] transition-colors leading-snug',
              featured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl'
            )}
          >
            {post.title}
          </h2>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="font-reading text-[rgb(var(--text-muted))] text-sm mb-3 line-clamp-1 italic">
              {post.subtitle}
            </p>
          )}

          {/* Excerpt */}
          <p
            className={cn(
              'font-reading text-[rgb(var(--text-secondary))] mb-4 leading-relaxed',
              featured ? 'line-clamp-3 text-sm sm:text-base' : 'line-clamp-2 text-sm'
            )}
          >
            {post.excerpt}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-ui text-[rgb(var(--text-muted))]">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {readingTime} min
            </span>
            {post.view_count > 0 && (
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {post.view_count.toLocaleString()}
              </span>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-ui bg-[rgb(var(--bg-tertiary))] text-[rgb(var(--text-muted))] rounded-md border border-[rgb(var(--border-color))] hover:border-[rgb(var(--border-hover))] transition-colors"
                >
                  #{tag}
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
