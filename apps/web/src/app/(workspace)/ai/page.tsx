'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Card, Grid } from '@paymentflow/ui';
import { PageContainer } from '@/components/PageContainer';
import { AgentInsightCard, PageHeader, SectionHeader, Toast } from '@/components/workspace';
import { AGENTS, AGENT_INSIGHTS, type AgentDefinition } from '@/lib/product';

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  agentName?: string;
}

const STARTER_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'agent',
    agentName: 'PaymentFlow Orchestrator',
    content:
      'Good morning, Michael. I can help explain cash flow, prepare payment drafts, review exchange-rate exposure, or summarize risk alerts. I will never execute a financial action without explicit approval.',
  },
];

const PROMPTS = [
  'What should I review before Friday payroll?',
  'Find the best wallet to fund the Ghana supplier payment.',
  'Summarize unusual transactions from the last seven days.',
  'Should I convert USD to NGN today?',
];

function createReply(prompt: string, agent: AgentDefinition): string {
  const lower = prompt.toLowerCase();

  if (lower.includes('payroll')) {
    return 'Friday payroll is currently covered, but the GBP wallet may fall below its £10,000 safety buffer after scheduled payments. I recommend reviewing a £20,000 EUR-to-GBP transfer draft. No transfer has been created or executed.';
  }
  if (lower.includes('ghana') || lower.includes('supplier')) {
    return 'The USD Operating Account has the strongest available buffer. A staged USD-to-GHS conversion would preserve the NGN and KES operating wallets. I can prepare a payment and conversion draft for your review.';
  }
  if (lower.includes('unusual') || lower.includes('risk') || lower.includes('fraud')) {
    return 'One transaction deserves review: the ₦2,500,000 inbound transfer from Adekunle Holdings is awaiting fraud screening. The transaction matches prior counterparty behavior, but its value is 2.4× the recent average. The Risk Agent has prepared the evidence summary.';
  }
  if (lower.includes('convert') || lower.includes('rate') || lower.includes('ngn')) {
    return 'USD/NGN is 0.23% above market open and above your preferred threshold. A staged conversion could reduce timing risk. This is an indicative recommendation based on demo data, not financial advice or a live market quote.';
  }

  return `${agent.name} reviewed the current demo workspace. The clearest next step is to review the seven scheduled payments and confirm whether the current approval policy still matches your operating limits. I can prepare a checklist, but all actions remain under your control.`;
}

export default function AiWorkspacePage() {
  const [selectedAgentId, setSelectedAgentId] = useState(AGENTS[0]!.id);
  const [messages, setMessages] = useState<ChatMessage[]>(STARTER_MESSAGES);
  const [prompt, setPrompt] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const selectedAgent = useMemo(
    () => AGENTS.find((agent) => agent.id === selectedAgentId) ?? AGENTS[0]!,
    [selectedAgentId],
  );

  function submitPrompt(value = prompt): void {
    const trimmed = value.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', content: trimmed },
      {
        id: `agent-${Date.now() + 1}`,
        role: 'agent',
        agentName: selectedAgent.name,
        content: createReply(trimmed, selectedAgent),
      },
    ]);
    setPrompt('');
  }

  return (
    <PageContainer>
      <div className="page-stack">
        <PageHeader
          eyebrow="Agent workspace"
          title="PaymentFlow AI"
          description="Coordinate specialized financial agents while keeping every recommendation explainable and every action under human control."
          actions={<Badge variant="info">Demo intelligence</Badge>}
        />

        <section aria-labelledby="agents-heading">
          <SectionHeader
            id="agents-heading"
            title="Specialized agents"
            description="Choose the specialist best suited to the task. The orchestrator can route work automatically later."
          />
          <Grid columns={4} gap="16px" minChildWidth="230px">
            {AGENTS.map((agent) => (
              <button
                key={agent.id}
                type="button"
                className={`agent-card${selectedAgent.id === agent.id ? ' agent-card--selected' : ''}`}
                onClick={() => setSelectedAgentId(agent.id)}
              >
                <span className="agent-card__topline"><span className="agent-card__icon" aria-hidden="true">{agent.icon}</span><Badge variant={agent.status === 'active' ? 'success' : 'info'}>{agent.status}</Badge></span>
                <strong>{agent.name}</strong>
                <small>{agent.role}</small>
                <p>{agent.description}</p>
              </button>
            ))}
          </Grid>
        </section>

        <div className="ai-workspace">
          <section className="ai-chat" aria-labelledby="ai-chat-heading">
            <div className="ai-chat__header">
              <div>
                <span className="workspace-page-header__eyebrow">Selected specialist</span>
                <h2 id="ai-chat-heading">{selectedAgent.name}</h2>
                <p>{selectedAgent.role}</p>
              </div>
              <span className="live-pill"><span aria-hidden="true" />Ready</span>
            </div>

            <div className="ai-chat__messages" aria-live="polite">
              {messages.map((message) => (
                <article key={message.id} className={`chat-message chat-message--${message.role}`}>
                  {message.role === 'agent' && <span className="chat-message__avatar" aria-hidden="true">✦</span>}
                  <div>
                    {message.agentName && <span className="chat-message__name">{message.agentName}</span>}
                    <p>{message.content}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="prompt-suggestions" aria-label="Suggested prompts">
              {PROMPTS.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => submitPrompt(suggestion)}>{suggestion}</button>
              ))}
            </div>

            <form className="ai-composer" onSubmit={(event) => { event.preventDefault(); submitPrompt(); }}>
              <label htmlFor="agent-prompt" className="sr-only">Ask PaymentFlow AI</label>
              <textarea
                id="agent-prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder={`Ask ${selectedAgent.name} about your workspace…`}
                rows={3}
              />
              <div className="ai-composer__footer">
                <span>Demo responses use mock data. Verify important financial decisions.</span>
                <Button type="submit">Send message</Button>
              </div>
            </form>
          </section>

          <aside className="ai-sidebar">
            <Card className="agent-profile-card">
              <span className="agent-profile-card__icon" aria-hidden="true">{selectedAgent.icon}</span>
              <h2>{selectedAgent.name}</h2>
              <p>{selectedAgent.description}</p>
              <ul>{selectedAgent.capabilities.map((capability) => <li key={capability}>✓ {capability}</li>)}</ul>
            </Card>

            <Card className="guardrail-card">
              <span aria-hidden="true">◇</span>
              <div><h3>Human approval required</h3><p>Agents can analyze, recommend, and prepare drafts. They cannot move money, change security controls, or approve their own actions.</p></div>
            </Card>

            <Card className="task-queue-card">
              <div className="task-queue-card__header"><h3>Agent task queue</h3><Badge variant="warning">3</Badge></div>
              <div><span>Review payroll buffer</span><small>Cashflow Agent · Ready</small></div>
              <div><span>Check inbound NGN transfer</span><small>Risk Agent · Monitoring</small></div>
              <div><span>Compare USD/GHS routes</span><small>FX Agent · Drafting</small></div>
              <Button variant="ghost" onClick={() => setToast('Task queue refreshed using demo data.')}>Refresh tasks</Button>
            </Card>
          </aside>
        </div>

        <section aria-labelledby="personalized-insights-heading">
          <SectionHeader id="personalized-insights-heading" title="Personalized recommendations" description="High-confidence insights surfaced from the current demo context." />
          <Grid columns={3} gap="16px" minChildWidth="280px">
            {AGENT_INSIGHTS.map((insight) => <AgentInsightCard key={insight.id} insight={insight} />)}
          </Grid>
        </section>
      </div>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </PageContainer>
  );
}
