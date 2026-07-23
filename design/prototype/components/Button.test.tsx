import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDefined();
  });

  it('applies primary variant class by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('btn--primary');
  });

  it('applies danger variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('btn--danger');
  });

  it('applies ghost variant class', () => {
    render(<Button variant="ghost">Cancel</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('btn--ghost');
  });

  it('defaults to type="button"', () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole('button').getAttribute('type')).toBe('button');
  });

  it('allows overriding type to submit', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
  });

  it('passes extra className', () => {
    render(<Button className="extra">Styled</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('extra');
  });

  it('spreads additional HTML attributes', () => {
    render(
      <Button disabled aria-label="close">
        X
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.getAttribute('aria-label')).toBe('close');
  });
});
