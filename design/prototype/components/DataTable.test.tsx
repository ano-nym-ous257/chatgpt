import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';

const sampleColumns = [
  { key: 'name', label: 'Name' },
  { key: 'amount', label: 'Amount' },
];

const sampleRows = [
  { id: '1', name: 'Alice', amount: '$100' },
  { id: '2', name: 'Bob', amount: '$250' },
];

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={sampleColumns} rows={sampleRows} />);
    expect(screen.getByText('Name')).toBeDefined();
    expect(screen.getByText('Amount')).toBeDefined();
  });

  it('renders row data', () => {
    render(<DataTable columns={sampleColumns} rows={sampleRows} />);
    expect(screen.getByText('Alice')).toBeDefined();
    expect(screen.getByText('$250')).toBeDefined();
  });

  it('uses role="table" with accessible label', () => {
    render(<DataTable columns={sampleColumns} rows={sampleRows} ariaLabel="Users" />);
    expect(screen.getByRole('table', { name: 'Users' })).toBeDefined();
  });

  it('renders default aria-label "Data table"', () => {
    render(<DataTable columns={sampleColumns} rows={sampleRows} />);
    expect(screen.getByRole('table', { name: 'Data table' })).toBeDefined();
  });

  it('renders empty state when no rows', () => {
    render(<DataTable columns={sampleColumns} rows={[]} />);
    const table = screen.getByRole('table');
    // Headers exist, but no data rows
    expect(table.querySelectorAll('[role="columnheader"]').length).toBe(2);
    const rowgroups = table.querySelectorAll('[role="rowgroup"]');
    // Second rowgroup (body) should be empty
    expect(rowgroups[1]?.querySelectorAll('[role="row"]').length).toBe(0);
  });

  it('applies custom className', () => {
    const { container } = render(
      <DataTable columns={sampleColumns} rows={sampleRows} className="wide" />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('wide');
  });
});
