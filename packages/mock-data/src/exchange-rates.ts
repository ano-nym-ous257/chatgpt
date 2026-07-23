import type { CurrencyCode } from '@paymentflow/shared-types';

export interface ExchangeRate {
  id: string;
  baseCurrency: CurrencyCode;
  quoteCurrency: CurrencyCode;
  rate: string;
  previousRate: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: string;
  updatedAt: string;
}

export const exchangeRates: ExchangeRate[] = [
  {
    id: 'fx_usd_eur',
    baseCurrency: 'USD',
    quoteCurrency: 'EUR',
    rate: '0.9214',
    previousRate: '0.9198',
    trend: 'up',
    changePercent: '0.17',
    updatedAt: '2026-07-16T08:30:00Z',
  },
  {
    id: 'fx_usd_gbp',
    baseCurrency: 'USD',
    quoteCurrency: 'GBP',
    rate: '0.7891',
    previousRate: '0.7905',
    trend: 'down',
    changePercent: '0.18',
    updatedAt: '2026-07-16T08:30:00Z',
  },
  {
    id: 'fx_usd_ngn',
    baseCurrency: 'USD',
    quoteCurrency: 'NGN',
    rate: '1542.30',
    previousRate: '1538.75',
    trend: 'up',
    changePercent: '0.23',
    updatedAt: '2026-07-16T08:30:00Z',
  },
  {
    id: 'fx_usd_kes',
    baseCurrency: 'USD',
    quoteCurrency: 'KES',
    rate: '129.45',
    previousRate: '129.80',
    trend: 'down',
    changePercent: '0.27',
    updatedAt: '2026-07-16T08:30:00Z',
  },
  {
    id: 'fx_eur_gbp',
    baseCurrency: 'EUR',
    quoteCurrency: 'GBP',
    rate: '0.8564',
    previousRate: '0.8560',
    trend: 'up',
    changePercent: '0.05',
    updatedAt: '2026-07-16T08:30:00Z',
  },
  {
    id: 'fx_gbp_ngn',
    baseCurrency: 'GBP',
    quoteCurrency: 'NGN',
    rate: '1954.10',
    previousRate: '1948.20',
    trend: 'up',
    changePercent: '0.30',
    updatedAt: '2026-07-16T08:30:00Z',
  },
];
