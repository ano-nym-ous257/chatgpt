import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Content</Container>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies max-width and auto margins', () => {
    const { container } = render(<Container maxWidth="800px">Content</Container>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.maxWidth).toBe('800px');
    expect(el.style.marginInline).toBe('auto');
  });

  it('appends custom className', () => {
    const { container } = render(<Container className="wide">Content</Container>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('wide');
  });

  it('renders as custom element', () => {
    render(<Container as="main">Content</Container>);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
