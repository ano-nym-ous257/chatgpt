import type { CurrencyCode, MonetaryAmount } from '@paymentflow/shared-types';

export interface DashboardWallet {
  id: string;
  name: string;
  currency: CurrencyCode;
  balance: MonetaryAmount;
  pendingBalance: MonetaryAmount;
  trend: 'up' | 'down' | 'stable';
  trendPercent: string;
}

export interface DashboardSummary {
  totalBalanceUsd: string;
  pendingPayments: number;
  monthlyVolume: string;
  activeWallets: number;
  complianceScore: number;
}

export const dashboardSummary: DashboardSummary = {
  totalBalanceUsd: '284,612.43',
  pendingPayments: 7,
  monthlyVolume: '1,247,830.00',
  activeWallets: 5,
  complianceScore: 98,
};

export const dashboardWallets: DashboardWallet[] = [
  {
    id: 'w_01J5R8K2M3N4P5Q6R7S8T9U0',
    name: 'Operating Account',
    currency: 'USD',
    balance: { amount: '142306.21', currency: 'USD' },
    pendingBalance: { amount: '3200.00', currency: 'USD' },
    trend: 'up',
    trendPercent: '4.2',
  },
  {
    id: 'w_02K6S9L3N4O5P6Q7R8S9T0U1',
    name: 'EUR Treasury',
    currency: 'EUR',
    balance: { amount: '89741.55', currency: 'EUR' },
    pendingBalance: { amount: '1500.00', currency: 'EUR' },
    trend: 'up',
    trendPercent: '2.8',
  },
  {
    id: 'w_03L7T0M4O5P6Q7R8S9T0U1V2',
    name: 'GBP Payroll',
    currency: 'GBP',
    balance: { amount: '31205.80', currency: 'GBP' },
    pendingBalance: { amount: '0.00', currency: 'GBP' },
    trend: 'stable',
    trendPercent: '0.1',
  },
  {
    id: 'w_04M8U1N5P6Q7R8S9T0U1V2W3',
    name: 'NGN Collections',
    currency: 'NGN',
    balance: { amount: '8750420.00', currency: 'NGN' },
    pendingBalance: { amount: '425000.00', currency: 'NGN' },
    trend: 'up',
    trendPercent: '12.5',
  },
  {
    id: 'w_05N9V2O6Q7R8S9T0U1V2W3X4',
    name: 'KES Mobile',
    currency: 'KES',
    balance: { amount: '2145600.00', currency: 'KES' },
    pendingBalance: { amount: '89000.00', currency: 'KES' },
    trend: 'down',
    trendPercent: '1.3',
  },
];
