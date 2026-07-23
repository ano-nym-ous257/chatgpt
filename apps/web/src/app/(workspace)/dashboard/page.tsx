'use client';

import Link from 'next/link';
import { Badge, Card, Divider, Grid, Stack } from '@paymentflow/ui';
import {
  dashboardSummary,
  dashboardWallets,
  exchangeRates,
  notifications,
  pendingPayments,
  transactions,
} from '@paymentflow/mock-data';
import { PageContainer } from '@/components/PageContainer';
import { AgentInsightCard, MetricCard, PageHeader, SectionHeader } from '@/components/workspace';
import {
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  formatRelativeTime,
  humanize,
  paymentStatusTone,
  trendArrow,
} from '@/lib/format';
import { AGENT_INSIGHTS, QUICK_ACTIONS } from '@/lib/product';
import { useAuth } from '@/providers/auth-provider';

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name.split(' ')[0] ?? 'there';
  const recentTransactions = transactions.slice(0, 5);
  const topRates = exchangeRates.slice(0, 4);
  const upcomingPayments = pendingPayments.slice(0, 4);
  const unreadNotifications = notifications.filter((notification) => !notification.read);

  return (
    <PageContainer>
      <Stack direction="vertical" gap="32px">
        <PageHeader
          eyebrow="Business workspace"
          title={`Good morning, ${firstName}`}
          description={`Wednesday, July 16, 2026 · ${dashboardSummary.pendingPayments} pending payments require attention`}
          actions={
            <Link href="/ai" className="btn btn--primary">
              <span aria-hidden="true">✦</span> Ask PaymentFlow AI
            </Link>
          }
        />

        <section aria-labelledby="metrics-heading">
          <h2 id="metrics-heading" className="sr-only">Account metrics</h2>
          <Grid columns={4} gap="16px" minChildWidth="220px">
            <MetricCard
              label="Total balance (USD eq.)"
              value={`$${dashboardSummary.totalBalanceUsd}`}
              change="↑ 4.8% this month"
              changeTone="positive"
              icon="◒"
            />
            <MetricCard
              label="Monthly volume"
              value={`$${dashboardSummary.monthlyVolume}`}
              change="68% of operating target"
              icon="↗"
            />
            <MetricCard
              label="Active wallets"
              value={String(dashboardSummary.activeWallets)}
              change="Across 5 currencies"
              icon="▣"
            />
            <MetricCard
              label="Compliance score"
              value={`${dashboardSummary.complianceScore}%`}
              change="All controls healthy"
              changeTone="positive"
              icon="◇"
            />
          </Grid>
        </section>

        <section aria-labelledby="quick-actions-heading">
          <SectionHeader
            id="quick-actions-heading"
            title="Quick Actions"
            description="Start your most common tasks or ask an agent to prepare the next step."
          />
          <div className="quick-action-grid">
            {QUICK_ACTIONS.map((action) => (
              <Link key={action.label} href={action.href} className="quick-action-card">
                <span className="quick-action-card__icon" aria-hidden="true">{action.icon}</span>
                <span className="quick-action-card__copy">
                  <span className="quick-action-card__label">{action.label}</span>
                  <span className="quick-action-card__description">{action.description}</span>
                </span>
                <span className="quick-action-card__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="wallets-heading">
          <SectionHeader
            id="wallets-heading"
            title="Wallet Overview"
            description="Available and pending balances across your operating currencies."
            action={<Link href="/wallets" className="text-link">Manage wallets →</Link>}
          />
          <Grid columns={3} gap="16px" minChildWidth="280px">
            {dashboardWallets.map((wallet) => (
              <Card key={wallet.id} className="wallet-summary-card">
                <div className="wallet-summary-card__header">
                  <div>
                    <span className="wallet-summary-card__currency">{wallet.currency}</span>
                    <h3 className="wallet-summary-card__name">{wallet.name}</h3>
                  </div>
                  <Badge variant={wallet.trend === 'down' ? 'danger' : 'success'}>
                    {trendArrow(wallet.trend)} {wallet.trendPercent}%
                  </Badge>
                </div>
                <p className="wallet-summary-card__balance">
                  {formatCompactCurrency(wallet.balance.amount, wallet.currency)}
                </p>
                <div className="wallet-summary-card__footer">
                  <span>
                    {wallet.pendingBalance.amount !== '0.00'
                      ? `${formatCurrency(wallet.pendingBalance.amount, wallet.currency)} pending`
                      : 'No pending balance'}
                  </span>
                  <Link href={`/wallets?wallet=${wallet.id}`} aria-label={`Open ${wallet.name}`}>→</Link>
                </div>
              </Card>
            ))}
          </Grid>
        </section>

        <section aria-labelledby="agent-insights-heading">
          <SectionHeader
            id="agent-insights-heading"
            title="AI Agent Insights"
            description="Personalized recommendations are prepared for review. Financial actions always require your approval."
            badge={<Badge variant="info">Personalized</Badge>}
            action={<Link href="/ai" className="text-link">Open AI workspace →</Link>}
          />
          <Grid columns={3} gap="16px" minChildWidth="280px">
            {AGENT_INSIGHTS.map((insight) => (
              <AgentInsightCard key={insight.id} insight={insight} />
            ))}
          </Grid>
        </section>

        <div className="dashboard__columns">
          <section aria-labelledby="activity-heading" className="dashboard__column-main">
            <SectionHeader
              id="activity-heading"
              title="Recent Activity"
              description="Latest money movement across all wallets."
              action={<Link href="/transactions" className="text-link">View all →</Link>}
            />
            <Card className="list-card">
              {recentTransactions.map((transaction, index) => (
                <div key={transaction.id}>
                  {index > 0 && <Divider />}
                  <Link href={`/transactions?transaction=${transaction.id}`} className="transaction-row">
                    <span
                      className={`transaction-row__icon transaction-row__icon--${transaction.direction}`}
                      aria-hidden="true"
                    >
                      {transaction.direction === 'inbound' ? '↓' : '↑'}
                    </span>
                    <span className="transaction-row__copy">
                      <span className="transaction-row__title">{transaction.description}</span>
                      <span className="transaction-row__meta">
                        {transaction.counterparty} · {formatRelativeTime(transaction.createdAt)}
                      </span>
                    </span>
                    <span className="transaction-row__amount">
                      <span className={transaction.direction === 'inbound' ? 'amount-positive' : ''}>
                        {transaction.direction === 'inbound' ? '+' : '−'}
                        {formatCurrency(transaction.amount.amount, transaction.amount.currency)}
                      </span>
                      <Badge variant={paymentStatusTone(transaction.status)}>
                        {humanize(transaction.status)}
                      </Badge>
                    </span>
                  </Link>
                </div>
              ))}
            </Card>
          </section>

          <aside aria-labelledby="rates-heading" className="dashboard__column-aside dashboard__module-column">
            <section>
              <SectionHeader
                id="rates-heading"
                title="Exchange Rates"
                badge={<span className="live-pill"><span aria-hidden="true" />Live</span>}
                action={<Link href="/exchange-rates" className="text-link">Convert →</Link>}
              />
              <Card className="list-card">
                {topRates.map((rate, index) => (
                  <div key={rate.id}>
                    {index > 0 && <Divider />}
                    <div className="rate-row">
                      <span>
                        <strong>{rate.baseCurrency}/{rate.quoteCurrency}</strong>
                        <small>Updated {formatRelativeTime(rate.updatedAt)}</small>
                      </span>
                      <span className="rate-row__value">
                        <strong>{rate.rate}</strong>
                        <small className={rate.trend === 'down' ? 'amount-negative' : 'amount-positive'}>
                          {trendArrow(rate.trend)} {rate.changePercent}%
                        </small>
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
            </section>

            <Card className="agent-status-card">
              <span className="agent-status-card__icon" aria-hidden="true">✦</span>
              <div>
                <span className="agent-status-card__eyebrow">Cashflow Agent</span>
                <h3>Monitoring 7 scheduled payments</h3>
                <p>No immediate liquidity risk detected in USD, EUR, NGN, or KES.</p>
                <Link href="/ai" className="text-link">View agent activity →</Link>
              </div>
            </Card>
          </aside>
        </div>

        <section aria-labelledby="payments-heading">
          <SectionHeader
            id="payments-heading"
            title="Upcoming Payments"
            description="Scheduled and in-flight payments that may require review."
            action={<Link href="/payments" className="text-link">Manage payments →</Link>}
          />
          <Grid columns={2} gap="16px" minChildWidth="320px">
            {upcomingPayments.map((payment) => (
              <Card key={payment.id} className="payment-card">
                <div className="payment-card__topline">
                  <span className="payment-card__date">{formatDate(payment.scheduledDate, { year: undefined })}</span>
                  <Badge variant={paymentStatusTone(payment.status)}>{humanize(payment.status)}</Badge>
                </div>
                <h3>{payment.description}</h3>
                <p>{payment.beneficiary}</p>
                <div className="payment-card__footer">
                  <strong>{formatCurrency(payment.amount.amount, payment.amount.currency)}</strong>
                  <span>{humanize(payment.method)}</span>
                </div>
              </Card>
            ))}
          </Grid>
        </section>

        <section aria-labelledby="notifications-heading">
          <SectionHeader
            id="notifications-heading"
            title="Notifications"
            description="Important account, security, payment, and compliance updates."
            badge={unreadNotifications.length > 0 ? <Badge variant="info">{unreadNotifications.length} unread</Badge> : undefined}
          />
          <Card className="list-card">
            {notifications.slice(0, 5).map((notification, index) => (
              <div key={notification.id}>
                {index > 0 && <Divider />}
                <div className={`notification-row${notification.read ? '' : ' notification-row--unread'}`}>
                  {!notification.read && <span className="notification-row__dot" aria-hidden="true" />}
                  {!notification.read && <span className="sr-only">Unread</span>}
                  <span className="notification-row__copy">
                    <strong>{notification.title}</strong>
                    <span>{notification.message}</span>
                  </span>
                  <time dateTime={notification.createdAt}>{formatRelativeTime(notification.createdAt)}</time>
                </div>
              </div>
            ))}
          </Card>
        </section>
      </Stack>
    </PageContainer>
  );
}
