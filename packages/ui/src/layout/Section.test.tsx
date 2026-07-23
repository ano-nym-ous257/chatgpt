import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section } from './Section';

describe('Section', () => {
  it('renders children', () => {
    render(<Section>Content</Section>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders as section element by default', () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('applies padding', () => {
    const { container } = render(<Section padding="16px">Content</Section>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.padding).toBe('16px');
  });

  it('renders as custom element', () => {
    render(<Section as="article">Content</Section>);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('appends custom className', () => {
    const { container } = render(<Section className="hero">Content</Section>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('hero');
  });
});
