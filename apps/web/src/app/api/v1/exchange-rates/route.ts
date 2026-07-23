import { NextResponse } from 'next/server';
import { exchangeRates } from '@paymentflow/mock-data';

export function GET() {
  return NextResponse.json({ data: exchangeRates, provider: 'paymentflow-demo', demo: true });
}
