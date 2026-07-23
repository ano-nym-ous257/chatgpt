import Link from 'next/link';
import { Badge, Card } from '@paymentflow/ui';
import type { AgentInsight } from '@/lib/product';

const TONE_LABEL: Record<AgentInsight['tone'], string> = {
  info: 'Insight',
  success: 'Opportunity',
  warning: 'Attention',
};

const BADGE_VARIANT: Record<AgentInsight['tone'], 'info' | 'success' | 'warning'> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
};

export function AgentInsightCard({ insight }: { insight: AgentInsight }) {
  return (
    <Card className={`agent-insight agent-insight--${insight.tone}`}>
      <div className="agent-insight__topline">
        <span className="agent-insight__eyebrow">{insight.eyebrow}</span>
        <Badge variant={BADGE_VARIANT[insight.tone]}>{TONE_LABEL[insight.tone]}</Badge>
      </div>
      <h3 className="agent-insight__title">{insight.title}</h3>
      <p className="agent-insight__description">{insight.description}</p>
      <div className="agent-insight__footer">
        <span className="agent-insight__confidence">{insight.confidence}% confidence</span>
        <Link href={insight.href} className="text-link">
          {insight.actionLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Card>
  );
}
