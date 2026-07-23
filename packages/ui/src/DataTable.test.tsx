import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTable } from './DataTable';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'amount', label: 'Amount' },
];

const rows = [
  { id: '1', name: 'Alice', amount: '$100' },
  { id: '2', name: 'Bob', amount: '$250' },
];

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={columns} rows={rows} />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(<DataTable columns={columns} rows={rows} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('$250')).toBeInTheDocument();
  });

  it('applies aria-label', () => {
    render(<DataTable columns={columns} rows={rows} ariaLabel="Payment table" />);
    expect(screen.getByRole('table', { name: 'Payment table' })).toBeInTheDocument();
  });

  it('renders empty state without errors', () => {
    render(<DataTable />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('appends custom className', () => {
    render(<DataTable className="compact" />);
    expect(screen.getByRole('table')).toHaveClass('compact');
  });
});
