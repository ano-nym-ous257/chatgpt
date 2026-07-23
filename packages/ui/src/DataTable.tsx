import type { ReactNode } from 'react';

export interface DataTableColumn {
  /** Unique key matching row property names */
  key: string;
  /** Display label for column header */
  label: string;
}

export interface DataTableProps {
  /** Column definitions */
  columns?: DataTableColumn[];
  /** Row data — each row is a record keyed by column keys */
  rows?: Record<string, ReactNode>[];
  /** Property name used as the unique key for each row */
  rowKey?: string;
  /** Accessible label for the table */
  ariaLabel?: string;
  /** Additional CSS class */
  className?: string;
}

export function DataTable({
  columns = [],
  rows = [],
  rowKey = 'id',
  ariaLabel = 'Data table',
  className = '',
}: DataTableProps) {
  return (
    <div
      className={`data-table ${className}`.trim()}
      role="table"
      aria-label={ariaLabel}
    >
      <div role="rowgroup">
        <div role="row" className="table-header">
          {columns.map((column) => (
            <div key={column.key} role="columnheader">
              {column.label}
            </div>
          ))}
        </div>
      </div>

      <div role="rowgroup">
        {rows.map((row, index) => (
          <div key={(row[rowKey] as string) ?? index} role="row">
            {columns.map((column) => (
              <div key={column.key} role="cell">
                {row[column.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
