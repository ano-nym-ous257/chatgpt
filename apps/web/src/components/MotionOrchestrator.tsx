'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_SELECTORS = [
  '.workspace-page-header',
  '.section-header',
  '.grid > *',
  '.quick-action-grid > *',
  '.content-split > *',
  '.dashboard__columns > *',
  '.settings-layout > *',
  '.settings-card-stack > *',
  '.filter-bar',
  '.inline-form-card',
  '.list-card',
  '.table-card',
  '.wallet-list',
  '.converter-card',
  '.market-chart-card',
  '.agent-status-card',
  '.agent-callout',
  '.guardrail-card',
  '.ai-workspace > *',
  '.task-queue-card',
].join(',');

function collectRevealElements(root: HTMLElement): HTMLElement[] {
  const seen = new Set<HTMLElement>();

  root.querySelectorAll<HTMLElement>(REVEAL_SELECTORS).forEach((element) => {
    seen.add(element);
  });

  return Array.from(seen);
}

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.getElementById('main-content');
    if (!root) return;

    const elements = collectRevealElements(root);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.documentElement.classList.add('motion-enabled');

    const siblingOrder = new Map<HTMLElement, number>();

    elements.forEach((element) => {
      const parent = element.parentElement;
      const order = parent ? (siblingOrder.get(parent) ?? 0) : 0;

      if (parent) siblingOrder.set(parent, order + 1);

      element.classList.add('motion-reveal');
      element.style.setProperty('--motion-order', String(Math.min(order, 6)));
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return () => {
        elements.forEach((element) => {
          element.classList.remove('motion-reveal', 'is-visible');
          element.style.removeProperty('--motion-order');
        });
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    const frame = window.requestAnimationFrame(() => {
      elements.forEach((element) => observer.observe(element));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      elements.forEach((element) => {
        element.classList.remove('motion-reveal', 'is-visible');
        element.style.removeProperty('--motion-order');
      });
    };
  }, [pathname]);

  return null;
}
