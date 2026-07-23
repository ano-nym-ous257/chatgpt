import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies default variant class', () => {
    const { container } = render(<Badge>Status</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('badge--default');
  });

  it('applies specified variant class', () => {
    const { container } = render(<Badge variant="success">Paid</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('badge--success');
  });

  it('applies danger variant', () => {
    const { container } = render(<Badge variant="danger">Failed</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('badge--danger');
  });

  it('appends custom className', () => {
    const { container } = render(<Badge className="small">Tag</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('small');
  });
});
