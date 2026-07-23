import type { ReactNode } from 'react';

export interface PageContainerProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function PageContainer({ children, title, className }: PageContainerProps) {
  return (
    <div className={`page-container${className ? ` ${className}` : ''}`}>
      {title && <h1 className="page-container__title">{title}</h1>}
      {children}
    </div>
  );
}
