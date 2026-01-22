'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Sparkles, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle, ThemeToggleCompact } from '@/components/ui/ThemeToggle';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dream Stories', href: '/category/dream-stories' },
  { name: 'Dream Science', href: '/category/dream-science' },
  { name: 'Sleep Tips', href: '/category/sleep-tips' },
  { name: 'Symbolism', href: '/category/symbolism' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="header-glass border-b border-[rgb(var(--border-color))]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[rgb(var(--accent-primary)/0.15)]">
                <Sparkles className="h-5 w-5 text-[rgb(var(--accent-primary))] transition-transform group-hover:scale-110" />
              </div>
              <span className="text-lg font-display text-[rgb(var(--text-primary))]">
                Dream Insights
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3.5 py-2 text-sm font-ui font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/search"
                className="p-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Link>

              {/* Theme toggle - desktop */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* Theme toggle - mobile */}
              <div className="sm:hidden">
                <ThemeToggleCompact />
              </div>

              <Link
                href="https://dreamanalysis.netlify.app"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 btn-primary text-sm"
              >
                Try the App
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] rounded-lg transition-colors"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden border-t border-[rgb(var(--border-color))] overflow-hidden transition-all duration-300',
            isMenuOpen ? 'max-h-96' : 'max-h-0'
          )}
        >
          <nav className="px-4 py-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 font-ui text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="https://dreamanalysis.netlify.app"
              className="block mt-3 px-4 py-3 btn-primary text-center"
            >
              Try the App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
