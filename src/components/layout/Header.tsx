'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Moon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      <div className="glass border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Moon className="h-8 w-8 text-dream-400 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 blur-lg bg-dream-500/30 group-hover:bg-dream-500/50 transition-colors" />
              </div>
              <span className="text-xl font-display font-bold bg-gradient-to-r from-white to-dream-200 bg-clip-text text-transparent">
                Dream Insights
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/search"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Search className="h-5 w-5" />
              </Link>

              <Link
                href="https://dreamanalysis.netlify.app"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-dream-600 to-aurora-600 hover:from-dream-500 hover:to-aurora-500 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-dream-500/25"
              >
                Try the App
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden border-t border-white/10 overflow-hidden transition-all duration-300',
            isMenuOpen ? 'max-h-96' : 'max-h-0'
          )}
        >
          <nav className="px-4 py-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="https://dreamanalysis.netlify.app"
              className="block mt-3 px-4 py-3 bg-gradient-to-r from-dream-600 to-aurora-600 text-white text-center font-medium rounded-lg"
            >
              Try the App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
