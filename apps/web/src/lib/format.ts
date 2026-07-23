import type { CurrencyCode, PaymentStatus } from '@paymentflow/shared-types';

const CURRENCY_LOCALES: Partial<Record<CurrencyCode, string>> = {
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  NGN: 'en-NG',
  KES: 'en-KE',
  GHS: 'en-GH',
  ZAR: 'en-ZA',
};

export function formatCurrency(
  amount: string | number,
  currency: CurrencyCode | string,
  options: Intl.NumberFormatOptions = {},
): string {
  const numericAmount = typeof amount === 'number' ? amount : Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${currency} 0.00`;
  }

  return new Intl.NumberFormat(CURRENCY_LOCALES[currency as CurrencyCode] ?? 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(numericAmount);
}

export function formatCompactCurrency(amount: string | number, currency: CurrencyCode | string): string {
  return formatCurrency(amount, currency, {
    notation: 'compact',
    maximumFractionDigits: 2,
  });
}

export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function formatRelativeTime(iso: string, now = new Date('2026-07-16T09:00:00Z')): string {
  const date = new Date(iso);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60_000));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return formatDate(iso, { year: undefined });
}

export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'default';

export function paymentStatusTone(status: PaymentStatus | string): BadgeTone {
  switch (status) {
    case 'completed':
    case 'fraud_approved':
      return 'success';
    case 'processing':
    case 'pending_fraud_check':
    case 'created':
      return 'warning';
    case 'failed':
    case 'fraud_declined':
    case 'cancelled':
      return 'danger';
    default:
      return 'info';
  }
}

export function humanize(value: string): string {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function trendArrow(trend: 'up' | 'down' | 'stable'): string {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
}
