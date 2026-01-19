'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { PostCard } from '@/components/posts/PostCard';
import { searchPosts as searchPostsApi, type BlogPost } from '@/lib/api';

// Search state type for consolidated state management
interface SearchState {
  results: BlogPost[];
  isLoading: boolean;
  hasSearched: boolean;
}

const initialState: SearchState = {
  results: [],
  isLoading: false,
  hasSearched: false,
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<SearchState>(initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Memoized search function
  const performSearch = useCallback(async (searchQuery: string) => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (searchQuery.length < 2) {
      setState(initialState);
      return;
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, isLoading: true, hasSearched: true }));

    try {
      const data = await searchPostsApi(searchQuery);
      setState({
        results: data.posts || [],
        isLoading: false,
        hasSearched: true,
      });
    } catch (error) {
      // Ignore abort errors
      if (error instanceof Error && error.name === 'AbortError') return;
      console.error('Search error:', error);
      setState(prev => ({ ...prev, results: [], isLoading: false }));
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => performSearch(query), 300);
    return () => {
      clearTimeout(debounce);
      // Cleanup abort controller on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, performSearch]);

  const { results, isLoading, hasSearched } = state;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-[rgb(var(--text-primary))] mb-8">
          Search Articles
        </h1>

        {/* Search input */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgb(var(--text-muted))]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for dreams, symbols, sleep tips..."
            className="w-full pl-12 pr-4 py-4 bg-[rgb(var(--glass-bg))] border border-[rgb(var(--border-color))] rounded-xl text-[rgb(var(--text-primary))] placeholder-[rgb(var(--text-muted))] focus:outline-none focus:border-[rgb(var(--accent-primary))]/50 focus:ring-2 focus:ring-[rgb(var(--accent-primary))]/20 transition-all"
            autoFocus
          />
          {isLoading && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgb(var(--accent-primary))] animate-spin" />
          )}
        </div>

        {/* Results */}
        {hasSearched && (
          <>
            {results.length > 0 ? (
              <>
                <p className="text-[rgb(var(--text-muted))] mb-6">
                  Found {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
                </p>
                <div className="space-y-6">
                  {results.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-[rgb(var(--text-muted))]/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[rgb(var(--text-primary))] mb-2">
                  No results found
                </h3>
                <p className="text-[rgb(var(--text-muted))]">
                  Try different keywords or browse our categories
                </p>
              </div>
            )}
          </>
        )}

        {!hasSearched && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-[rgb(var(--text-muted))]/50 mx-auto mb-4" />
            <p className="text-[rgb(var(--text-muted))]">
              Start typing to search for articles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
