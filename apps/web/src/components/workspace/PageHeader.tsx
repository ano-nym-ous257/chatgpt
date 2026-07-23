import type { ReactNode } from 'react';

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="workspace-page-header">
      <div className="workspace-page-header__copy">
        {eyebrow && <span className="workspace-page-header__eyebrow">{eyebrow}</span>}
        <h1 className="workspace-page-header__title">{title}</h1>
        {description && <p className="workspace-page-header__description">{description}</p>}
      </div>
      {actions && <div className="workspace-page-header__actions">{actions}</div>}
    </header>
  );
}
