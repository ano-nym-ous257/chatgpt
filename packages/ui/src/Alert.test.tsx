import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert variant="info">Heads up!</Alert>);
    expect(screen.getByText('Heads up!')).toBeInTheDocument();
  });

  it('uses role="alert" for error variant', () => {
    render(<Alert variant="error">Something failed</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for non-error variants', () => {
    render(<Alert variant="success">Done!</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <Alert variant="warning" title="Warning">
        Details here
      </Alert>,
    );
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Details here')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Alert variant="info">Note</Alert>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('alert--info');
  });

  it('appends custom className', () => {
    const { container } = render(
      <Alert variant="success" className="banner">
        OK
      </Alert>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('banner');
  });
});
