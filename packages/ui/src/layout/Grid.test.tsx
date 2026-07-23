import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders children', () => {
    render(
      <Grid>
        <div>Cell</div>
      </Grid>,
    );
    expect(screen.getByText('Cell')).toBeInTheDocument();
  });

  it('uses grid display', () => {
    const { container } = render(
      <Grid columns={3}>
        <div>A</div>
      </Grid>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.display).toBe('grid');
  });

  it('applies numeric columns', () => {
    const { container } = render(
      <Grid columns={2}>
        <div>A</div>
      </Grid>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
  });

  it('applies minChildWidth as auto-fit', () => {
    const { container } = render(
      <Grid minChildWidth="200px">
        <div>A</div>
      </Grid>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(200px, 1fr))');
  });

  it('appends custom className', () => {
    const { container } = render(
      <Grid className="cards">
        <div>A</div>
      </Grid>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('cards');
  });
});
