'use client';

import { memo } from 'react';
import { AUTHOR } from '@/lib/author';
import { Sparkles, Twitter } from 'lucide-react';

interface AuthorCardProps {
  variant?: 'compact' | 'full';
}

export const AuthorCard = memo(function AuthorCard({ variant = 'compact' }: AuthorCardProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dream-500 to-aurora-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-700 rounded-full border-2 border-[rgb(var(--bg-primary))] flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">AI</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-[rgb(var(--hero-text))]">{AUTHOR.name}</p>
          <p className="text-xs text-[rgb(var(--hero-meta))]">{AUTHOR.title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-dream-500 via-aurora-500 to-cosmic-500 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-700 rounded-full border-2 border-[rgb(var(--bg-primary))] flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">AI</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]">{AUTHOR.name}</h3>
            <span className="px-2 py-0.5 text-xs bg-[rgb(var(--accent-primary))]/20 text-[rgb(var(--accent-primary))] rounded-full">
              {AUTHOR.title}
            </span>
          </div>
          <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">{AUTHOR.shortBio}</p>
          <a
            href={`https://twitter.com/${AUTHOR.social.twitter.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[rgb(var(--text-muted))] hover:text-[rgb(var(--accent-primary))] transition-colors"
          >
            <Twitter className="w-3.5 h-3.5" />
            {AUTHOR.social.twitter}
          </a>
        </div>
      </div>
    </div>
  );
});

AuthorCard.displayName = 'AuthorCard';
