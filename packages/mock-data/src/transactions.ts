import type {
  CurrencyCode,
  MonetaryAmount,
  PaymentDirection,
  PaymentMethod,
  PaymentStatus,
} from '@paymentflow/shared-types';

export interface MockTransaction {
  id: string;
  description: string;
  amount: MonetaryAmount;
  fee: MonetaryAmount;
  sourceCurrency: CurrencyCode;
  destinationCurrency: CurrencyCode;
  method: PaymentMethod;
  direction: PaymentDirection;
  status: PaymentStatus;
  counterparty: string;
  reference: string;
  createdAt: string;
}

export const transactions: MockTransaction[] = [
  {
    id: 'txn_01J9A2B3C4D5E6F7G8H9I0J1',
    description: 'Invoice payment from Acme Corp',
    amount: { amount: '15750.00', currency: 'USD' },
    fee: { amount: '23.63', currency: 'USD' },
    sourceCurrency: 'USD',
    destinationCurrency: 'USD',
    method: 'bank_transfer',
    direction: 'inbound',
    status: 'completed',
    counterparty: 'Acme Corporation Ltd.',
    reference: 'INV-2026-0847',
    createdAt: '2026-07-16T08:15:00Z',
  },
  {
    id: 'txn_02K0B3C4D5E6F7G8H9I0J1K2',
    description: 'Payroll disbursement — July cycle',
    amount: { amount: '24500.00', currency: 'GBP' },
    fee: { amount: '12.25', currency: 'GBP' },
    sourceCurrency: 'GBP',
    destinationCurrency: 'GBP',
    method: 'bank_transfer',
    direction: 'outbound',
    status: 'processing',
    counterparty: 'Multiple Recipients (12)',
    reference: 'PAY-2026-JUL-001',
    createdAt: '2026-07-16T07:30:00Z',
  },
  {
    id: 'txn_03L1C4D5E6F7G8H9I0J1K2L3',
    description: 'Currency exchange USD → EUR',
    amount: { amount: '50000.00', currency: 'USD' },
    fee: { amount: '75.00', currency: 'USD' },
    sourceCurrency: 'USD',
    destinationCurrency: 'EUR',
    method: 'wallet_transfer',
    direction: 'outbound',
    status: 'completed',
    counterparty: 'Internal Treasury',
    reference: 'FX-2026-0234',
    createdAt: '2026-07-15T16:42:00Z',
  },
  {
    id: 'txn_04M2D5E6F7G8H9I0J1K2L3M4',
    description: 'Vendor payment — Cloud services',
    amount: { amount: '8940.00', currency: 'USD' },
    fee: { amount: '13.41', currency: 'USD' },
    sourceCurrency: 'USD',
    destinationCurrency: 'USD',
    method: 'bank_transfer',
    direction: 'outbound',
    status: 'completed',
    counterparty: 'AWS Inc.',
    reference: 'VND-2026-0156',
    createdAt: '2026-07-15T14:20:00Z',
  },
  {
    id: 'txn_05N3E6F7G8H9I0J1K2L3M4N5',
    description: 'Mobile money collection — Kenya',
    amount: { amount: '450000.00', currency: 'KES' },
    fee: { amount: '1350.00', currency: 'KES' },
    sourceCurrency: 'KES',
    destinationCurrency: 'KES',
    method: 'mobile_money',
    direction: 'inbound',
    status: 'completed',
    counterparty: 'Safaricom M-Pesa',
    reference: 'MPESA-2026-8841',
    createdAt: '2026-07-15T11:05:00Z',
  },
  {
    id: 'txn_06O4F7G8H9I0J1K2L3M4N5O6',
    description: 'Client deposit — Adekunle Holdings',
    amount: { amount: '2500000.00', currency: 'NGN' },
    fee: { amount: '0.00', currency: 'NGN' },
    sourceCurrency: 'NGN',
    destinationCurrency: 'NGN',
    method: 'bank_transfer',
    direction: 'inbound',
    status: 'pending_fraud_check',
    counterparty: 'Adekunle Holdings PLC',
    reference: 'DEP-2026-NGN-092',
    createdAt: '2026-07-15T09:50:00Z',
  },
  {
    id: 'txn_07P5G8H9I0J1K2L3M4N5O6P7',
    description: 'Subscription — Compliance tools',
    amount: { amount: '299.00', currency: 'USD' },
    fee: { amount: '4.49', currency: 'USD' },
    sourceCurrency: 'USD',
    destinationCurrency: 'USD',
    method: 'card',
    direction: 'outbound',
    status: 'completed',
    counterparty: 'ComplyAdvantage',
    reference: 'SUB-2026-0071',
    createdAt: '2026-07-14T22:00:00Z',
  },
  {
    id: 'txn_08Q6H9I0J1K2L3M4N5O6P7Q8',
    description: 'Cross-border transfer — Lagos to London',
    amount: { amount: '3200000.00', currency: 'NGN' },
    fee: { amount: '16000.00', currency: 'NGN' },
    sourceCurrency: 'NGN',
    destinationCurrency: 'GBP',
    method: 'bank_transfer',
    direction: 'outbound',
    status: 'fraud_approved',
    counterparty: 'Okafor Exports Ltd.',
    reference: 'XBR-2026-0089',
    createdAt: '2026-07-14T15:30:00Z',
  },
];
