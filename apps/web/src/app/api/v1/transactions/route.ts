import { NextResponse } from 'next/server';
import { transactions } from '@paymentflow/mock-data';

export function GET(request: Request) {
  const url = new URL(request.url);
  const direction = url.searchParams.get('direction');
  const status = url.searchParams.get('status');
  const query = url.searchParams.get('query')?.toLowerCase();

  const data = transactions.filter((transaction) => {
    const matchesDirection = !direction || transaction.direction === direction;
    const matchesStatus = !status || transaction.status === status;
    const matchesQuery =
      !query ||
      transaction.description.toLowerCase().includes(query) ||
      transaction.counterparty.toLowerCase().includes(query) ||
      transaction.reference.toLowerCase().includes(query);
    return matchesDirection && matchesStatus && matchesQuery;
  });

  return NextResponse.json({ data, count: data.length, demo: true });
}
