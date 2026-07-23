import type {
  CurrencyCode,
  MonetaryAmount,
  WalletStatus,
  WalletType,
} from '@paymentflow/shared-types';

export interface MockWallet {
  id: string;
  name: string;
  ownerId: string;
  type: WalletType;
  status: WalletStatus;
  currency: CurrencyCode;
  balance: MonetaryAmount;
  pendingBalance: MonetaryAmount;
  reservedBalance: MonetaryAmount;
  createdAt: string;
  updatedAt: string;
}

export const wallets: MockWallet[] = [
  {
    id: 'w_01J5R8K2M3N4P5Q6R7S8T9U0',
    name: 'Operating Account',
    ownerId: 'usr_01H9XKPZ3M7V2N8B4C5D6E7F',
    type: 'business',
    status: 'active',
    currency: 'USD',
    balance: { amount: '142306.21', currency: 'USD' },
    pendingBalance: { amount: '3200.00', currency: 'USD' },
    reservedBalance: { amount: '10000.00', currency: 'USD' },
    createdAt: '2025-11-15T09:30:00Z',
    updatedAt: '2026-07-16T08:22:14Z',
  },
  {
    id: 'w_02K6S9L3N4O5P6Q7R8S9T0U1',
    name: 'EUR Treasury',
    ownerId: 'usr_01H9XKPZ3M7V2N8B4C5D6E7F',
    type: 'business',
    status: 'active',
    currency: 'EUR',
    balance: { amount: '89741.55', currency: 'EUR' },
    pendingBalance: { amount: '1500.00', currency: 'EUR' },
    reservedBalance: { amount: '5000.00', currency: 'EUR' },
    createdAt: '2025-12-01T14:00:00Z',
    updatedAt: '2026-07-15T16:45:30Z',
  },
  {
    id: 'w_03L7T0M4O5P6Q7R8S9T0U1V2',
    name: 'GBP Payroll',
    ownerId: 'usr_01H9XKPZ3M7V2N8B4C5D6E7F',
    type: 'business',
    status: 'active',
    currency: 'GBP',
    balance: { amount: '31205.80', currency: 'GBP' },
    pendingBalance: { amount: '0.00', currency: 'GBP' },
    reservedBalance: { amount: '15000.00', currency: 'GBP' },
    createdAt: '2026-01-10T11:15:00Z',
    updatedAt: '2026-07-14T09:30:00Z',
  },
  {
    id: 'w_04M8U1N5P6Q7R8S9T0U1V2W3',
    name: 'NGN Collections',
    ownerId: 'usr_01H9XKPZ3M7V2N8B4C5D6E7F',
    type: 'business',
    status: 'active',
    currency: 'NGN',
    balance: { amount: '8750420.00', currency: 'NGN' },
    pendingBalance: { amount: '425000.00', currency: 'NGN' },
    reservedBalance: { amount: '0.00', currency: 'NGN' },
    createdAt: '2026-02-20T08:00:00Z',
    updatedAt: '2026-07-16T07:55:00Z',
  },
  {
    id: 'w_05N9V2O6Q7R8S9T0U1V2W3X4',
    name: 'KES Mobile',
    ownerId: 'usr_01H9XKPZ3M7V2N8B4C5D6E7F',
    type: 'business',
    status: 'active',
    currency: 'KES',
    balance: { amount: '2145600.00', currency: 'KES' },
    pendingBalance: { amount: '89000.00', currency: 'KES' },
    reservedBalance: { amount: '200000.00', currency: 'KES' },
    createdAt: '2026-03-05T13:20:00Z',
    updatedAt: '2026-07-16T06:10:00Z',
  },
];
