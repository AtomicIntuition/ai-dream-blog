'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { PostCard } from '@/components/posts/PostCard';
import type { BlogPost } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const searchPosts = async () => {
      if (query.length < 2) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setHasSearched(true);

      try {
        const res = await fetch(
          `${API_URL}/api/blog/posts?search=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        if (data.success && data.data) {
          setResults(data.data.posts || []);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-white mb-8">
          Search Articles
        </h1>

        {/* Search input */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for dreams, symbols, sleep tips..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-dream-500/50 focus:ring-2 focus:ring-dream-500/20 transition-all"
            autoFocus
          />
          {isLoading && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dream-400 animate-spin" />
          )}
        </div>

        {/* Results */}
        {hasSearched && (
          <>
            {results.length > 0 ? (
              <>
                <p className="text-slate-400 mb-6">
                  Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
                </p>
                <div className="space-y-6">
                  {results.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No results found
                </h3>
                <p className="text-slate-400">
                  Try different keywords or browse our categories
                </p>
              </div>
            )}
          </>
        )}

        {!hasSearched && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">
              Start typing to search for articles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
