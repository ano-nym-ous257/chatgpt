'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Card, Grid, Input } from '@paymentflow/ui';
import { pendingPayments as initialPayments, wallets, type MockPayment } from '@paymentflow/mock-data';
import type { CurrencyCode, PaymentMethod } from '@paymentflow/shared-types';
import { PageContainer } from '@/components/PageContainer';
import { MetricCard, Modal, PageHeader, SectionHeader, Toast } from '@/components/workspace';
import { formatCurrency, formatDate, humanize, paymentStatusTone } from '@/lib/format';

const BENEFICIARIES = [
  'Wanjiku Enterprises',
  'Canary Wharf Properties',
  'Stefan Müller',
  'Stripe Inc.',
  'AIG Commercial',
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<MockPayment[]>(initialPayments);
  const [sendOpen, setSendOpen] = useState(false);
  const [details, setDetails] = useState<MockPayment | null>(null);
  const [sourceWalletId, setSourceWalletId] = useState(wallets[0]!.id);
  const [beneficiary, setBeneficiary] = useState(BENEFICIARIES[0]!);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('bank_transfer');
  const [toast, setToast] = useState<string | null>(null);

  const sourceWallet = wallets.find((wallet) => wallet.id === sourceWalletId) ?? wallets[0]!;

  const paymentMetrics = useMemo(() => {
    const scheduled = payments.filter((payment) => payment.status === 'created').length;
    const inReview = payments.filter((payment) => payment.status === 'pending_fraud_check').length;
    const processing = payments.filter((payment) => payment.status === 'processing').length;
    const total = payments.reduce((sum, payment) => sum + Number(payment.amount.amount), 0);
    return { scheduled, inReview, processing, total };
  }, [payments]);

  function submitPayment(): void {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0 || !description.trim()) return;

    const currency = sourceWallet.currency as CurrencyCode;
    const payment: MockPayment = {
      id: `pay_demo_${Date.now()}`,
      description: description.trim(),
      amount: { amount: numericAmount.toFixed(2), currency },
      fee: { amount: (numericAmount * 0.0015).toFixed(2), currency },
      sourceCurrency: currency,
      destinationCurrency: currency,
      method,
      status: numericAmount >= 10_000 ? 'pending_fraud_check' : 'created',
      beneficiary,
      scheduledDate: new Date(Date.now() + 86_400_000).toISOString(),
      createdAt: new Date().toISOString(),
    };

    setPayments((current) => [payment, ...current]);
    setSendOpen(false);
    setAmount('');
    setDescription('');
    setToast('Payment draft created. Review and approval are still required.');
  }

  return (
    <PageContainer>
      <div className="page-stack">
        <PageHeader
          eyebrow="Payment operations"
          title="Payments"
          description="Prepare, review, schedule, and track domestic and cross-border payments."
          actions={<Button onClick={() => setSendOpen(true)}>Send payment</Button>}
        />

        <section aria-label="Payment summary">
          <Grid columns={4} gap="16px" minChildWidth="210px">
            <MetricCard label="Scheduled" value={String(paymentMetrics.scheduled)} change="Awaiting execution" icon="◷" />
            <MetricCard label="Compliance review" value={String(paymentMetrics.inReview)} change="Agent evidence ready" changeTone="neutral" icon="◇" />
            <MetricCard label="Processing" value={String(paymentMetrics.processing)} change="Settlement in progress" icon="↗" />
            <MetricCard label="Upcoming value" value={`$${paymentMetrics.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} change="Native-currency total" icon="◒" />
          </Grid>
        </section>

        <section aria-labelledby="payment-queue-heading">
          <SectionHeader
            id="payment-queue-heading"
            title="Payment queue"
            description="Every payment remains reviewable before execution in this demonstration."
            action={<Button variant="ghost" onClick={() => setToast('Approval queue refreshed.')}>Refresh</Button>}
          />
          <Card className="table-card">
            <div className="responsive-table" role="table" aria-label="Payment queue">
              <div className="responsive-table__header" role="row">
                <span role="columnheader">Payment</span>
                <span role="columnheader">Beneficiary</span>
                <span role="columnheader">Schedule</span>
                <span role="columnheader">Amount</span>
                <span role="columnheader">Status</span>
              </div>
              {payments.map((payment) => (
                <button key={payment.id} type="button" className="responsive-table__row" role="row" onClick={() => setDetails(payment)}>
                  <span role="cell" data-label="Payment"><strong>{payment.description}</strong><small>{humanize(payment.method)}</small></span>
                  <span role="cell" data-label="Beneficiary">{payment.beneficiary}</span>
                  <span role="cell" data-label="Schedule">{formatDate(payment.scheduledDate, { year: undefined })}</span>
                  <span role="cell" data-label="Amount" className="numeric-cell">{formatCurrency(payment.amount.amount, payment.amount.currency)}</span>
                  <span role="cell" data-label="Status"><Badge variant={paymentStatusTone(payment.status)}>{humanize(payment.status)}</Badge></span>
                </button>
              ))}
            </div>
          </Card>
        </section>

        <div className="content-split">
          <section aria-labelledby="approval-heading">
            <SectionHeader id="approval-heading" title="Approval policy" description="Controls currently applied to outgoing payments." />
            <Card className="policy-card">
              <div className="policy-card__row"><span>Under $10,000</span><strong>Single approver</strong></div>
              <div className="policy-card__row"><span>$10,000–$50,000</span><strong>Two approvers</strong></div>
              <div className="policy-card__row"><span>Above $50,000</span><strong>Finance lead + compliance</strong></div>
              <div className="policy-card__row"><span>New beneficiary</span><strong>24-hour cooling period</strong></div>
            </Card>
          </section>

          <aside aria-labelledby="payment-agent-heading">
            <SectionHeader id="payment-agent-heading" title="Payment Agent" badge={<Badge variant="info">Ready</Badge>} />
            <Card className="agent-callout">
              <span className="agent-callout__icon" aria-hidden="true">✦</span>
              <div>
                <h3>Let the agent prepare the payment</h3>
                <p>Describe who to pay and why. The agent can prepare a draft, calculate fees, and surface required approvals. It cannot execute without confirmation.</p>
                <Button variant="ghost" onClick={() => setToast('Open the AI Workspace to prepare this task with the Payment Agent.')}>Prepare with agent</Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      <Modal
        open={sendOpen}
        title="Prepare a payment"
        description="Create a reviewable payment draft. No real funds move in demo mode."
        onClose={() => setSendOpen(false)}
        footer={<><Button variant="ghost" onClick={() => setSendOpen(false)}>Cancel</Button><Button onClick={submitPayment}>Create draft</Button></>}
      >
        <div className="form-stack">
          <label className="select-field"><span>Source wallet</span><select value={sourceWalletId} onChange={(event) => setSourceWalletId(event.target.value)}>{wallets.map((wallet) => <option key={wallet.id} value={wallet.id}>{wallet.name} · {wallet.currency}</option>)}</select></label>
          <label className="select-field"><span>Beneficiary</span><select value={beneficiary} onChange={(event) => setBeneficiary(event.target.value)}>{BENEFICIARIES.map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
          <Input label={`Amount (${sourceWallet.currency})`} value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" placeholder="0.00" />
          <Input label="Payment description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Invoice 2026-1042" />
          <label className="select-field"><span>Payment method</span><select value={method} onChange={(event) => setMethod(event.target.value as PaymentMethod)}><option value="bank_transfer">Bank transfer</option><option value="wallet_transfer">Wallet transfer</option><option value="mobile_money">Mobile money</option><option value="card">Card</option></select></label>
          <div className="review-note"><strong>Estimated fee</strong><span>{formatCurrency((Number(amount || 0) * 0.0015).toFixed(2), sourceWallet.currency)}</span></div>
        </div>
      </Modal>

      <Modal
        open={Boolean(details)}
        title={details?.description ?? 'Payment details'}
        description="Payment review and settlement information."
        onClose={() => setDetails(null)}
        footer={<Button onClick={() => { setDetails(null); setToast('Payment approval recorded in demo mode.'); }}>Approve in demo</Button>}
      >
        {details && <dl className="detail-list detail-list--modal"><div><dt>Beneficiary</dt><dd>{details.beneficiary}</dd></div><div><dt>Amount</dt><dd>{formatCurrency(details.amount.amount, details.amount.currency)}</dd></div><div><dt>Fee</dt><dd>{formatCurrency(details.fee.amount, details.fee.currency)}</dd></div><div><dt>Method</dt><dd>{humanize(details.method)}</dd></div><div><dt>Status</dt><dd>{humanize(details.status)}</dd></div><div><dt>Scheduled</dt><dd>{formatDate(details.scheduledDate)}</dd></div></dl>}
      </Modal>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </PageContainer>
  );
}
