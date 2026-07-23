/**
 * PaymentFlow AI — Prototype Application
 * Handles navigation, copilot chat, search, and prototype action notices.
 * Wrapped in an IIFE to avoid global scope pollution.
 */
;(function initPaymentFlowApp() {
  'use strict';

  /* ── Constants ────────────────────────────────────────────────── */

  const NOTICE_DURATION_MS = 3600;
  const AI_LABEL = 'PaymentFlow AI';
  const SCROLL_BEHAVIOR = 'smooth';

  const COPILOT_RESPONSES = [
    {
      match: (text) => text.includes('expense'),
      reply:
        'Top expenses are payroll, cloud infrastructure, card processing, and travel. I recommend switching 62% of EU payouts to SEPA instant and renegotiating two SaaS contracts.',
    },
    {
      match: (text) => text.includes('revenue'),
      reply:
        "Next month's revenue is projected between $2.08M and $2.16M, with enterprise expansion and faster collections as the strongest drivers.",
    },
    {
      match: (text) => text.includes('late') || text.includes('customers'),
      reply:
        'Media, logistics, and two marketplace customers show the highest late-payment probability. I can draft reminders and adjust the cash forecast.',
    },
  ];

  const COPILOT_DEFAULT_REPLY =
    'I found three actions: optimize payment routing, tighten approval policy for one vendor, and sweep idle USD into insured treasury for 38 bps of additional yield.';

  /** Buttons excluded from prototype-notice wiring */
  const EXCLUDED_BUTTON_SELECTOR =
    '[data-view], [data-view-trigger], #menuButton, .prompt-row button, .chat-compose button[type="submit"]';

  /* ── DOM queries ──────────────────────────────────────────────── */

  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const $ = (selector) => document.querySelector(selector);

  const navItems = $$('[data-view]');
  const views = $$('.view');
  const viewTriggers = $$('[data-view-trigger]');
  const rail = $('#rail');
  const menuButton = $('#menuButton');
  const copilotForm = $('.chat-compose');
  const copilotInput = $('#copilotInput');
  const chatStream = $('.chat-stream');
  const promptButtons = $$('.prompt-row button');
  const globalSearchForm = $('.search');
  const globalSearchInput = $('#globalSearch');
  const prototypeNotice = $('#prototypeNotice');

  let noticeTimer;

  /* ── Utility functions ────────────────────────────────────────── */

  function showPrototypeNotice(message) {
    if (!prototypeNotice) return;

    window.clearTimeout(noticeTimer);
    prototypeNotice.textContent = message;
    prototypeNotice.hidden = false;

    noticeTimer = window.setTimeout(() => {
      prototypeNotice.hidden = true;
    }, NOTICE_DURATION_MS);
  }

  function setView(viewId) {
    if (!viewId) return;

    views.forEach((view) => {
      view.classList.toggle('is-active', view.id === viewId);
    });

    navItems.forEach((item) => {
      const isActive = item.dataset.view === viewId;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    rail?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: SCROLL_BEHAVIOR });
  }

  function appendMessage(text, type) {
    if (!chatStream || !text || !text.trim()) return;

    const message = document.createElement('div');
    message.className = 'message ' + type;

    if (type === 'ai') {
      const strong = document.createElement('strong');
      strong.textContent = AI_LABEL;
      message.append(strong, document.createTextNode(text));
    } else {
      message.textContent = text;
    }

    chatStream.appendChild(message);
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function generateCopilotReply(prompt) {
    if (!prompt) return COPILOT_DEFAULT_REPLY;

    const normalized = prompt.toLowerCase();
    const matched = COPILOT_RESPONSES.find((r) => r.match(normalized));
    return matched ? matched.reply : COPILOT_DEFAULT_REPLY;
  }

  /* ── Event binding ────────────────────────────────────────────── */

  navItems.forEach((item) => {
    item.addEventListener('click', () => setView(item.dataset.view));
  });

  viewTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => setView(trigger.dataset.viewTrigger));
  });

  menuButton?.addEventListener('click', () => {
    const isOpen = rail?.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !rail?.classList.contains('is-open')) return;
    rail.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.focus();
  });

  promptButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const text = button.textContent || '';
      setView('ai');
      appendMessage(text, 'user');
      appendMessage(generateCopilotReply(text), 'ai');
    });
  });

  copilotForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!copilotInput) return;

    const prompt = copilotInput.value.trim();
    if (!prompt) return;

    appendMessage(prompt, 'user');
    appendMessage(generateCopilotReply(prompt), 'ai');
    copilotInput.value = '';
  });

  globalSearchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = globalSearchInput?.value.trim();
    if (!query) return;

    showPrototypeNotice(
      'Search for "' + query + '" is ready for backend integration; no live records were queried.',
    );
  });

  /* Wire prototype notices for all non-functional buttons */
  const prototypeActionButtons = $$('button').filter(
    (button) => !button.matches(EXCLUDED_BUTTON_SELECTOR),
  );

  prototypeActionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const action =
        button.getAttribute('aria-label') || button.textContent?.trim() || 'This action';
      showPrototypeNotice(
        action + ' is a prototype control; it does not move money or change live data.',
      );
    });
  });
})();
