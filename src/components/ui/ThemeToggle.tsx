'use client';

import { Moon, Sun, Sunset } from 'lucide-react';
import { useTheme, Theme } from '@/contexts/ThemeContext';
import { THEME_ORDER, THEME_META } from '@/lib/constants';

// Theme configuration - icons represent the reading environment
const THEMES: readonly { value: Theme; icon: React.ElementType; label: string; description: string }[] = [
  { value: 'obsidian', icon: Moon, label: 'Obsidian', description: 'Night reading' },
  { value: 'alabaster', icon: Sun, label: 'Alabaster', description: 'Day reading' },
  { value: 'dusk', icon: Sunset, label: 'Dusk', description: 'Evening reading' },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, isTransitioning } = useTheme();

  return (
    <div className="theme-toggle-container">
      <div className="theme-toggle-group">
        {THEMES.map(({ value, icon: Icon, label, description }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            disabled={isTransitioning}
            className={`theme-toggle-btn ${theme === value ? 'active' : ''} ${isTransitioning ? 'pointer-events-none' : ''}`}
            title={`${label}: ${description}`}
            aria-label={`Switch to ${label} theme`}
            aria-pressed={theme === value}
          >
            <Icon
              className={`h-4 w-4 transition-transform duration-200 ${
                theme === value && isTransitioning ? 'scale-110' : ''
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Compact version for mobile
export function ThemeToggleCompact() {
  const { theme, setTheme, isTransitioning } = useTheme();

  const cycleTheme = () => {
    if (isTransitioning) return;
    const currentIndex = THEME_ORDER.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
    setTheme(THEME_ORDER[nextIndex]);
  };

  const currentTheme = THEMES.find(t => t.value === theme);
  const Icon = currentTheme?.icon || Moon;
  const meta = THEME_META[theme];

  return (
    <button
      onClick={cycleTheme}
      disabled={isTransitioning}
      className={`theme-toggle-compact ${isTransitioning ? 'pointer-events-none' : ''}`}
      title={`${meta.name}: ${meta.description}`}
      aria-label="Cycle through themes"
    >
      <Icon
        className={`h-5 w-5 transition-transform duration-200 ${
          isTransitioning ? 'rotate-180 scale-110' : ''
        }`}
      />
    </button>
  );
}
