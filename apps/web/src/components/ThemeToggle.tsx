'use client';

import { useTheme } from '@/providers/theme-provider';

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <svg className="theme-toggle__sun" width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="3.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.35 4.35l1.4 1.4M14.25 14.25l1.4 1.4M4.35 15.65l1.4-1.4M14.25 5.75l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <svg className="theme-toggle__moon" width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M16.5 12.2A6.8 6.8 0 017.8 3.5 7 7 0 1016.5 12.2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">Current theme: {theme}</span>
    </button>
  );
}
