import { Card } from '@paymentflow/ui';

export interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  changeTone?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

export function MetricCard({
  label,
  value,
  change,
  changeTone = 'neutral',
  icon,
}: MetricCardProps) {
  return (
    <Card className="metric-card">
      <div className="metric-card__header">
        <span className="metric-card__label">{label}</span>
        {icon && <span className="metric-card__icon" aria-hidden="true">{icon}</span>}
      </div>
      <span className="metric-card__value">{value}</span>
      {change && (
        <span className={`metric-card__change metric-card__change--${changeTone}`}>{change}</span>
      )}
    </Card>
  );
}
