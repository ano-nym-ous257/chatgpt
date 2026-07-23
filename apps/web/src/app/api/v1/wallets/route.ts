import { NextResponse } from 'next/server';
import { wallets } from '@paymentflow/mock-data';

export function GET() {
  return NextResponse.json({ data: wallets, demo: true });
}
