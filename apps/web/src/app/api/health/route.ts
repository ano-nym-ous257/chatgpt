import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    service: 'paymentflow-web',
    status: 'ok',
    version: '0.2.0',
    timestamp: new Date().toISOString(),
  });
}
