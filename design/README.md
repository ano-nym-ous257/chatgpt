# PaymentFlow AI — Design Archive

This directory contains the original prototype and design artifacts for PaymentFlow AI.

## Purpose

These files served as the high-fidelity design exploration during the initial product phase. They established the visual language, interaction patterns, and component API surface that informed the production component library.

## Status

**This is not production code.**

The production component library lives at `packages/ui/`. All future applications should consume components exclusively from that package.

## Contents

- `prototype/` — Complete prototype application (HTML, CSS, JS, design tokens)
- `prototype/components/` — Original component starters (JSX + TypeScript explorations)
- `prototype/styles/` — CSS partials from the prototype phase
- `prototype/backups/` — Historical backup snapshots

## Why This Exists

Prototype artifacts are preserved for:

1. Historical reference — understanding original design intent
2. Visual documentation — the prototype can still be opened in a browser
3. Onboarding — new team members can see how the design evolved

## Engineering Boundary

Files in this directory are excluded from:

- TypeScript compilation
- ESLint linting
- Build pipelines
- Package validation

They are inert reference material only.
