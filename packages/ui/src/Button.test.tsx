import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies primary variant class by default', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--primary');
  });

  it('applies the specified variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--danger');
  });

  it('defaults to type="button"', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('forwards HTML attributes', () => {
    render(
      <Button disabled aria-label="disabled button">
        Off
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-label', 'disabled button');
  });

  it('appends custom className', () => {
    render(<Button className="custom">Styled</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });
});
