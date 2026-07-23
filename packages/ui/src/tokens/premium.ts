/**
 * PaymentFlow AI — Premium Design Tokens
 *
 * Design philosophy: Apple × Stripe × Mercury × Linear
 * Premium through restraint. Financial confidence through clarity.
 */

export const colors = {
  background: {
    base: '#050a12',
    subtle: '#080e1a',
    muted: '#0c1322',
    canvas: '#0f172a',
  },
  surface: {
    default: 'rgba(15, 23, 42, 0.6)',
    elevated: 'rgba(30, 41, 59, 0.5)',
    floating: 'rgba(30, 41, 59, 0.8)',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    primary: '#f1f5f9',
    secondary: '#94a3b8',
    muted: '#64748b',
    inverse: '#0f172a',
  },
  accent: {
    primary: '#3b82f6',
    hover: '#60a5fa',
    subtle: 'rgba(59, 130, 246, 0.12)',
    focus: 'rgba(59, 130, 246, 0.4)',
  },
  financial: {
    success: '#10b981',
    successSubtle: 'rgba(16, 185, 129, 0.12)',
    warning: '#f59e0b',
    warningSubtle: 'rgba(245, 158, 11, 0.12)',
    danger: '#ef4444',
    dangerSubtle: 'rgba(239, 68, 68, 0.12)',
    info: '#06b6d4',
    infoSubtle: 'rgba(6, 182, 212, 0.12)',
  },
  border: {
    subtle: 'rgba(148, 163, 184, 0.06)',
    default: 'rgba(148, 163, 184, 0.1)',
    strong: 'rgba(148, 163, 184, 0.2)',
    focus: 'rgba(59, 130, 246, 0.5)',
  },
  gradient: {
    heroStart: '#0f172a',
    heroMid: '#1e293b',
    heroEnd: '#0f172a',
    accentStart: '#3b82f6',
    accentEnd: '#06b6d4',
    surfaceStart: 'rgba(30, 41, 59, 0.5)',
    surfaceEnd: 'rgba(15, 23, 42, 0.5)',
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
    display: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  },
  fontSize: {
    display: '2.5rem',
    h1: '1.875rem',
    h2: '1.25rem',
    h3: '1.0625rem',
    bodyLg: '1rem',
    body: '0.875rem',
    bodySm: '0.8125rem',
    caption: '0.75rem',
    micro: '0.6875rem',
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.2',
    snug: '1.35',
    normal: '1.5',
    relaxed: '1.65',
  },
  letterSpacing: {
    tight: '-0.025em',
    snug: '-0.015em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.08em',
  },
} as const;

export const spacing = {
  px: '1px',
  '0': '0',
  '0.5': '2px',
  '1': '4px',
  '1.5': '6px',
  '2': '8px',
  '2.5': '10px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
} as const;

export const radius = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  hero: '28px',
  full: '9999px',
} as const;

export const shadows = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.2)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)',
  md: '0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.1)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.15)',
  card: '0 2px 8px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)',
  cardHover: '0 8px 24px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.12)',
  floating: '0 12px 36px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.15)',
  glow: '0 0 20px rgba(59, 130, 246, 0.15)',
  glowAccent: '0 0 30px rgba(6, 182, 212, 0.1)',
  inset: 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
} as const;

export const motion = {
  duration: {
    instant: '50ms',
    fast: '120ms',
    normal: '200ms',
    slow: '300ms',
    slower: '450ms',
    entrance: '350ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
} as const;

export const zIndex = {
  base: '0',
  raised: '1',
  dropdown: '10',
  sticky: '20',
  overlay: '30',
  sidebar: '40',
  header: '50',
  modal: '60',
  toast: '70',
  tooltip: '80',
} as const;

export const iconSpec = {
  family: 'Lucide',
  defaultSize: '20px',
  strokeWidth: '1.5',
  style: 'outline',
  sizes: {
    xs: '14px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
  },
} as const;
