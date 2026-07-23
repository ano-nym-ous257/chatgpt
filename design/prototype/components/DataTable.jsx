import React from 'react';

/**
 * Simple DataTable starter
 * Props: columns: [{key,label}], rows: [{key: value}], rowKey, ariaLabel
 */
export default function DataTable({
  columns = [],
  rows = [],
  rowKey = 'id',
  ariaLabel = 'Data table',
  className = '',
}) {
  return (
    <div className={`data-table ${className}`} role="table" aria-label={ariaLabel}>
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
          <div key={row[rowKey] ?? index} role="row">
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
