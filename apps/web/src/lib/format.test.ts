import { describe, expect, it } from 'vitest';
import { formatCurrency, formatRelativeTime, humanize, paymentStatusTone } from './format';

describe('format helpers', () => {
  it('formats monetary values with their ISO currency', () => {
    expect(formatCurrency('1250.5', 'USD')).toContain('1,250.50');
  });

  it('formats recent timestamps relative to the workspace clock', () => {
    expect(formatRelativeTime('2026-07-16T08:15:00Z')).toBe('45m ago');
  });

  it('maps payment states to UI tones', () => {
    expect(paymentStatusTone('completed')).toBe('success');
    expect(paymentStatusTone('pending_fraud_check')).toBe('warning');
    expect(paymentStatusTone('failed')).toBe('danger');
  });

  it('humanizes snake-case labels', () => {
    expect(humanize('pending_fraud_check')).toBe('Pending Fraud Check');
  });
});
