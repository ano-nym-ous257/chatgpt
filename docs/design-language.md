# PaymentFlow AI — Design Language

## Philosophy

PaymentFlow AI's visual language follows the aesthetic principles of **Apple × Stripe × Mercury × Linear**.

The platform communicates trust, precision, and modernity through:

- **Restraint** — every visual element earns its place
- **Depth** — layered surfaces create spatial hierarchy without noise
- **Confidence** — financial data is presented clearly with typographic emphasis
- **Calm** — dark, low-contrast backgrounds reduce cognitive load
- **Alive** — subtle motion confirms interaction without distraction

We achieve premium through what we *don't* add, not through decoration.

---

## Color System

### Foundation

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#050a12` | Page background |
| `--bg-subtle` | `#080e1a` | Sidebar, header |
| `--bg-muted` | `#0c1322` | Recessed areas |
| `--bg-canvas` | `#0f172a` | Content canvas |

### Surfaces

| Token | Value | Usage |
|-------|-------|-------|
| `--surface` | `rgba(15, 23, 42, 0.6)` | Cards, panels |
| `--surface-elevated` | `rgba(30, 41, 59, 0.5)` | Hover states, elevated cards |
| `--surface-floating` | `rgba(30, 41, 59, 0.8)` | Dropdowns, popovers |
| `--surface-overlay` | `rgba(0, 0, 0, 0.6)` | Modal overlays |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#f1f5f9` | Headings, values, primary content |
| `--text-secondary` | `#94a3b8` | Descriptions, supporting text |
| `--text-muted` | `#64748b` | Labels, timestamps, tertiary |

### Accent

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#3b82f6` | Primary actions, active states |
| `--accent-hover` | `#60a5fa` | Hover variant |
| `--accent-subtle` | `rgba(59, 130, 246, 0.12)` | Active backgrounds |
| `--accent-gradient` | `linear-gradient(135deg, #3b82f6, #06b6d4)` | Logo, highlights |

### Financial Status

| Token | Value | Usage |
|-------|-------|-------|
| `--success` | `#10b981` | Completed, positive, inbound |
| `--warning` | `#f59e0b` | Pending, attention needed |
| `--danger` | `#ef4444` | Failed, declined, errors |
| `--info` | `#06b6d4` | Informational, neutral highlight |

### Borders

| Token | Value | Usage |
|-------|-------|-------|
| `--border-subtle` | `rgba(148, 163, 184, 0.06)` | Structural separators |
| `--border-default` | `rgba(148, 163, 184, 0.1)` | Card borders, dividers |
| `--border-strong` | `rgba(148, 163, 184, 0.2)` | Hover borders, emphasis |
| `--border-focus` | `rgba(59, 130, 246, 0.5)` | Focus rings |

---

## Typography

### Font Stack

- **Primary**: Inter (loaded from Google Fonts)
- **Monospace**: JetBrains Mono (for financial values)
- **Fallback**: System font stack

### Scale

| Class | Size | Weight | Tracking | Usage |
|-------|------|--------|----------|-------|
| `.text-display` | 2.5rem | Bold | -0.025em | Hero numbers |
| `.text-h1` | 1.875rem | Bold | -0.015em | Page headings |
| `.text-h2` | 1.25rem | Semibold | -0.015em | Section headings |
| `.text-h3` | 1.0625rem | Semibold | normal | Subsection headings |
| `.text-body-lg` | 1rem | Regular | normal | Large body text |
| `.text-body` | 0.875rem | Regular | normal | Default body |
| `.text-body-sm` | 0.8125rem | Regular | normal | Compact text |
| `.text-caption` | 0.75rem | Regular | normal | Metadata, timestamps |
| `.text-micro` | 0.6875rem | Regular | normal | Labels |

### Principles

- Financial numbers use `font-variant-numeric: tabular-nums` for alignment
- Negative letter-spacing on headings creates density and authority
- Labels use uppercase + wide tracking for separation from values
- Line heights are tighter on headings, looser on body text

---

## Spacing

4px base unit. All spacing follows this scale:

`0 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96`

---

## Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | 4px | Small buttons, badges |
| `--radius-sm` | 6px | Inputs, small cards |
| `--radius-md` | 8px | Buttons, navigation items |
| `--radius-lg` | 12px | Card elements |
| `--radius-xl` | 16px | Primary cards |
| `--radius-2xl` | 20px | Hero cards |
| `--radius-hero` | 28px | Feature sections |

---

## Elevation (Shadows)

Shadows are layered and soft. Each level combines a spread shadow with a tight shadow for realism.

| Level | Usage |
|-------|-------|
| `--shadow-card` | Default card state |
| `--shadow-card-hover` | Card hover (elevated feel) |
| `--shadow-floating` | Dropdowns, popovers |
| `--shadow-glow` | Accent emphasis, active states |

---

## Motion

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | 50ms | Immediate feedback |
| `--duration-fast` | 120ms | Hover color changes |
| `--duration-normal` | 200ms | Shadow transitions |
| `--duration-slow` | 300ms | Layout shifts, sidebar |
| `--duration-entrance` | 350ms | Page enter animations |

### Easing

- `--ease-default`: Standard deceleration
- `--ease-out`: Elements appearing (fast start, slow end)
- `--ease-spring`: Playful overshoot for small elements
- `--ease-smooth`: Long-running transitions

### Principles

- Hover: `translateY(-1px)` or `-2px` for cards
- Active: `scale(0.97)` for press feedback
- Enter: Staggered fade-up for card grids
- No animation >450ms
- Respect `prefers-reduced-motion`

---

## Background System

The page background uses three layers:

1. **Base color** (`--bg-base`) — deep navy-black
2. **Radial gradients** — soft accent light sources at canvas edges
3. **Noise texture** — SVG fractal noise at 1.5% opacity for organic depth

This creates a sense of three-dimensional space without distraction.

---

## Accessibility

- All text meets WCAG 2.1 AA contrast minimums (4.5:1 for body, 3:1 for large text)
- Focus rings use double-outline pattern: 2px base color gap + 4px accent ring
- Motion respects `prefers-reduced-motion: reduce`
- Interactive elements have minimum 44×44px touch targets
- Color is never the sole indicator of state (always paired with text/icon)

---

## Icon Standard

- **Family**: Lucide Icons
- **Style**: Outline, consistent stroke width (1.5px)
- **Default size**: 20px
- **Sizing scale**: 14px (xs) | 16px (sm) | 20px (md) | 24px (lg) | 32px (xl)
- **Color**: Inherits from parent `color` property
- **Implementation**: Future ticket (PF-0012B or later)

---

## Component Principles

1. All cards use `backdrop-filter: blur()` for frosted glass depth
2. Hover states combine color shift + shadow elevation + subtle lift
3. Active states use `scale(0.97)` for tactile feedback
4. Borders are always transparent until interaction (progressive disclosure)
5. Financial values are always `tabular-nums` and slightly larger than surrounding text
6. Status badges use background + text + border in matching hue
7. Cards have 16px radius, 20px padding, and animated transitions
