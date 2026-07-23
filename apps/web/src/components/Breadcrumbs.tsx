import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumbs${className ? ` ${className}` : ''}`}>
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="breadcrumbs__item">
              {index > 0 && (
                <span className="breadcrumbs__separator" aria-hidden="true">
                  /
                </span>
              )}
              {isLast ? (
                <span className="breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link href={item.href} className="breadcrumbs__link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumbs__link">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
