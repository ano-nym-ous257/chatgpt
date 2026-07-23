import type { ReactNode } from 'react';

export interface SectionHeaderProps {
  id?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  badge?: ReactNode;
}

export function SectionHeader({ id, title, description, action, badge }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-header__copy">
        <div className="section-header__title-row">
          <h2 id={id} className="section-header__title">
            {title}
          </h2>
          {badge}
        </div>
        {description && <p className="section-header__description">{description}</p>}
      </div>
      {action && <div className="section-header__action">{action}</div>}
    </div>
  );
}
