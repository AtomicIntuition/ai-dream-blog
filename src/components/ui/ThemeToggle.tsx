'use client';

import { Moon, Sun, BookOpen } from 'lucide-react';
import { useTheme, Theme } from '@/contexts/ThemeContext';

const themes: { value: Theme; icon: React.ElementType; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'sepia', icon: BookOpen, label: 'Sepia' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <div className="theme-toggle-group">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`theme-toggle-btn ${theme === value ? 'active' : ''}`}
            title={`${label} theme`}
            aria-label={`Switch to ${label} theme`}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Compact version for mobile
export function ThemeToggleCompact() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
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
      className="theme-toggle-compact"
      title={`Current: ${currentTheme?.label}. Click to change.`}
      aria-label="Toggle theme"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
