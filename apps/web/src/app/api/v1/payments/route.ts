import { NextResponse } from 'next/server';
import { pendingPayments } from '@paymentflow/mock-data';

interface DemoPaymentRequest {
  amount?: string;
  currency?: string;
  beneficiary?: string;
  description?: string;
}

export function GET() {
  return NextResponse.json({ data: pendingPayments, count: pendingPayments.length, demo: true });
}

export async function POST(request: Request) {
  const body = (await request.json()) as DemoPaymentRequest;

  if (!body.amount || !body.currency || !body.beneficiary || !body.description) {
    return NextResponse.json(
      {
        error: {
          code: 'INVALID_DEMO_PAYMENT',
          message: 'amount, currency, beneficiary, and description are required',
        },
      },
      { status: 400 },
    );
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: { code: 'INVALID_AMOUNT', message: 'amount must be a positive number' } },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      data: {
        id: `pay_demo_${crypto.randomUUID()}`,
        ...body,
        status: amount >= 10_000 ? 'pending_fraud_check' : 'created',
        execution: 'not_performed',
        createdAt: new Date().toISOString(),
      },
      demo: true,
      message: 'Payment draft created. No funds were moved.',
    },
    { status: 201 },
  );
}
