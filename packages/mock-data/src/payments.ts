import type {
  CurrencyCode,
  MonetaryAmount,
  PaymentMethod,
  PaymentStatus,
} from '@paymentflow/shared-types';

export interface MockPayment {
  id: string;
  description: string;
  amount: MonetaryAmount;
  fee: MonetaryAmount;
  sourceCurrency: CurrencyCode;
  destinationCurrency: CurrencyCode;
  method: PaymentMethod;
  status: PaymentStatus;
  beneficiary: string;
  scheduledDate: string;
  createdAt: string;
}

export const pendingPayments: MockPayment[] = [
  {
    id: 'pay_01R7I0J1K2L3M4N5O6P7Q8R9',
    description: 'Quarterly supplier payment — Nairobi',
    amount: { amount: '1250000.00', currency: 'KES' },
    fee: { amount: '3750.00', currency: 'KES' },
    sourceCurrency: 'KES',
    destinationCurrency: 'KES',
    method: 'mobile_money',
    status: 'created',
    beneficiary: 'Wanjiku Enterprises',
    scheduledDate: '2026-07-17T09:00:00Z',
    createdAt: '2026-07-15T14:00:00Z',
  },
  {
    id: 'pay_02S8J1K2L3M4N5O6P7Q8R9S0',
    description: 'Office lease — London HQ',
    amount: { amount: '8500.00', currency: 'GBP' },
    fee: { amount: '0.00', currency: 'GBP' },
    sourceCurrency: 'GBP',
    destinationCurrency: 'GBP',
    method: 'bank_transfer',
    status: 'processing',
    beneficiary: 'Canary Wharf Properties',
    scheduledDate: '2026-07-18T08:00:00Z',
    createdAt: '2026-07-14T10:30:00Z',
  },
  {
    id: 'pay_03T9K2L3M4N5O6P7Q8R9S0T1',
    description: 'Contractor payment — Frontend dev',
    amount: { amount: '4200.00', currency: 'EUR' },
    fee: { amount: '6.30', currency: 'EUR' },
    sourceCurrency: 'EUR',
    destinationCurrency: 'EUR',
    method: 'bank_transfer',
    status: 'pending_fraud_check',
    beneficiary: 'Stefan Müller',
    scheduledDate: '2026-07-17T12:00:00Z',
    createdAt: '2026-07-16T06:45:00Z',
  },
  {
    id: 'pay_04U0L3M4N5O6P7Q8R9S0T1U2',
    description: 'API service credits — Annual renewal',
    amount: { amount: '12000.00', currency: 'USD' },
    fee: { amount: '18.00', currency: 'USD' },
    sourceCurrency: 'USD',
    destinationCurrency: 'USD',
    method: 'card',
    status: 'created',
    beneficiary: 'Stripe Inc.',
    scheduledDate: '2026-07-19T00:00:00Z',
    createdAt: '2026-07-15T20:00:00Z',
  },
  {
    id: 'pay_05V1M4N5O6P7Q8R9S0T1U2V3',
    description: 'Cross-border payroll — Ghana team',
    amount: { amount: '45600.00', currency: 'GHS' },
    fee: { amount: '228.00', currency: 'GHS' },
    sourceCurrency: 'USD',
    destinationCurrency: 'GHS',
    method: 'bank_transfer',
    status: 'fraud_approved',
    beneficiary: 'Multiple Recipients (4)',
    scheduledDate: '2026-07-17T10:00:00Z',
    createdAt: '2026-07-16T07:00:00Z',
  },
  {
    id: 'pay_06W2N5O6P7Q8R9S0T1U2V3W4',
    description: 'Insurance premium — Q3',
    amount: { amount: '3450.00', currency: 'USD' },
    fee: { amount: '0.00', currency: 'USD' },
    sourceCurrency: 'USD',
    destinationCurrency: 'USD',
    method: 'bank_transfer',
    status: 'created',
    beneficiary: 'AIG Commercial',
    scheduledDate: '2026-07-20T08:00:00Z',
    createdAt: '2026-07-14T16:00:00Z',
  },
  {
    id: 'pay_07X3O6P7Q8R9S0T1U2V3W4X5',
    description: 'Software license — Security suite',
    amount: { amount: '1875.00', currency: 'USD' },
    fee: { amount: '2.81', currency: 'USD' },
    sourceCurrency: 'USD',
    destinationCurrency: 'USD',
    method: 'card',
    status: 'processing',
    beneficiary: 'CrowdStrike Holdings',
    scheduledDate: '2026-07-16T15:00:00Z',
    createdAt: '2026-07-16T05:30:00Z',
  },
];
