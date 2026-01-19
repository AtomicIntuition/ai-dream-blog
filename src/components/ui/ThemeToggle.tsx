'use client';

import { Moon, Sun, BookOpen } from 'lucide-react';
import { useTheme, Theme } from '@/contexts/ThemeContext';

const themes: { value: Theme; icon: React.ElementType; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'sepia', icon: BookOpen, label: 'Sepia' },
];

export function ThemeToggle() {
  const { theme, setTheme, isTransitioning } = useTheme();

  return (
    <div className="theme-toggle-container">
      <div className="theme-toggle-group">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            disabled={isTransitioning}
            className={`theme-toggle-btn ${theme === value ? 'active' : ''} ${isTransitioning ? 'pointer-events-none' : ''}`}
            title={`${label} theme`}
            aria-label={`Switch to ${label} theme`}
            aria-pressed={theme === value}
          >
            <Icon
              className={`h-4 w-4 transition-transform duration-300 ${
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
    const order: Theme[] = ['light', 'dark', 'sepia'];
    const currentIndex = order.indexOf(theme);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  const currentTheme = themes.find(t => t.value === theme);
  const Icon = currentTheme?.icon || Moon;

  return (
    <button
      onClick={cycleTheme}
      disabled={isTransitioning}
      className={`theme-toggle-compact ${isTransitioning ? 'pointer-events-none' : ''}`}
      title={`Current: ${currentTheme?.label}. Click to change.`}
      aria-label="Toggle theme"
    >
      <Icon
        className={`h-5 w-5 transition-transform duration-300 ${
          isTransitioning ? 'rotate-180 scale-110' : ''
        }`}
      />
    </button>
  );
}
