import { NextResponse } from 'next/server';
import { AGENTS, AGENT_INSIGHTS } from '@/lib/product';

export function GET() {
  return NextResponse.json({ data: { agents: AGENTS, insights: AGENT_INSIGHTS }, demo: true });
}
