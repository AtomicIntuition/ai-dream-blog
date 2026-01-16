import Link from 'next/link';
import { Calendar, Clock, Eye } from 'lucide-react';
import { cn, formatDate, calculateReadingTime, getCategoryLabel } from '@/lib/utils';
import type { BlogPost } from '@/lib/api';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const readingTime = calculateReadingTime(post.content);

  const categoryClasses: Record<string, string> = {
    'dream-stories': 'bg-dream-500/20 text-dream-300 border-dream-500/30',
    'dream-science': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'sleep-tips': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'symbolism': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  };

  return (
    <article
      className={cn(
        'group glass-card overflow-hidden transition-all duration-300',
        'hover:border-white/20 hover:shadow-lg hover:shadow-dream-500/10',
        featured && 'md:col-span-2'
      )}
    >
      <Link href={`/post/${post.slug}`} className="block">
        {/* Card content */}
        <div className={cn('p-6', featured && 'md:p-8')}>
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className={cn(
                'px-3 py-1 text-xs font-medium rounded-full border',
                categoryClasses[post.category] || categoryClasses['dream-stories']
              )}
            >
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
              'font-display font-bold text-white mb-3 group-hover:text-dream-300 transition-colors',
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            )}
          >
            {post.title}
          </h2>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-slate-400 text-sm mb-3 line-clamp-1">
              {post.subtitle}
            </p>
          )}

          {/* Excerpt */}
          <p
            className={cn(
              'text-slate-300 mb-4',
              featured ? 'line-clamp-3' : 'line-clamp-2'
            )}
          >
            {post.excerpt}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-slate-400">
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
                  className="px-2 py-0.5 text-xs bg-white/5 text-slate-400 rounded"
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
}
