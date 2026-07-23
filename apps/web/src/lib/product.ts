export interface AgentDefinition {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  status: 'active' | 'monitoring' | 'ready';
  capabilities: readonly string[];
}

export const AGENTS: readonly AgentDefinition[] = [
  {
    id: 'cashflow-agent',
    name: 'Cashflow Agent',
    role: 'Treasury intelligence',
    description: 'Forecasts runway, identifies funding gaps, and recommends wallet rebalancing.',
    icon: '◒',
    status: 'active',
    capabilities: ['Forecast liquidity', 'Suggest transfers', 'Explain balance changes'],
  },
  {
    id: 'payment-agent',
    name: 'Payment Agent',
    role: 'Payment operations',
    description: 'Prepares transfers, detects payment exceptions, and tracks settlement progress.',
    icon: '↗',
    status: 'ready',
    capabilities: ['Prepare payment drafts', 'Track settlements', 'Resolve failed payments'],
  },
  {
    id: 'risk-agent',
    name: 'Risk Agent',
    role: 'Fraud and compliance',
    description: 'Surfaces unusual activity and summarizes the evidence behind every alert.',
    icon: '◇',
    status: 'monitoring',
    capabilities: ['Review anomalies', 'Summarize KYC risk', 'Escalate approvals'],
  },
  {
    id: 'fx-agent',
    name: 'FX Agent',
    role: 'Currency optimization',
    description: 'Monitors rates and recommends conversion windows based on treasury priorities.',
    icon: '⇄',
    status: 'monitoring',
    capabilities: ['Watch rate thresholds', 'Compare routes', 'Prepare conversion quotes'],
  },
];

export interface AgentInsight {
  id: string;
  agentId: string;
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  tone: 'info' | 'success' | 'warning';
  confidence: number;
}

export const AGENT_INSIGHTS: readonly AgentInsight[] = [
  {
    id: 'insight-payroll-gap',
    agentId: 'cashflow-agent',
    eyebrow: 'Liquidity forecast',
    title: 'GBP Payroll may fall below your safety buffer',
    description:
      'Scheduled payments could reduce the wallet to £6,705.80 on Friday. Moving £20,000 from EUR Treasury would restore the configured buffer.',
    actionLabel: 'Review recommendation',
    href: '/ai?insight=insight-payroll-gap',
    tone: 'warning',
    confidence: 94,
  },
  {
    id: 'insight-fx-window',
    agentId: 'fx-agent',
    eyebrow: 'FX opportunity',
    title: 'USD/NGN is above your preferred conversion threshold',
    description:
      'The current rate is 0.23% above market open. A staged conversion may reduce exposure before next week’s supplier run.',
    actionLabel: 'Compare conversion routes',
    href: '/exchange-rates',
    tone: 'success',
    confidence: 88,
  },
  {
    id: 'insight-compliance',
    agentId: 'risk-agent',
    eyebrow: 'Compliance task',
    title: 'Renew a business certificate before it expires',
    description:
      'Your business registration certificate expires in 14 days. The agent has prepared the document checklist for review.',
    actionLabel: 'Open compliance checklist',
    href: '/settings?section=security',
    tone: 'info',
    confidence: 100,
  },
];

export const QUICK_ACTIONS = [
  { label: 'Send payment', href: '/payments?mode=send', icon: '↗', description: 'Pay a beneficiary' },
  { label: 'Add funds', href: '/wallets?action=fund', icon: '+', description: 'Fund a wallet' },
  { label: 'Convert currency', href: '/exchange-rates?action=convert', icon: '⇄', description: 'Get an FX quote' },
  { label: 'Ask an agent', href: '/ai', icon: '✦', description: 'Get financial guidance' },
] as const;
