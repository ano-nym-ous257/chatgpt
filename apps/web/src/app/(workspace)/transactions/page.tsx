'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Card, Input } from '@paymentflow/ui';
import { transactions, type MockTransaction } from '@paymentflow/mock-data';
import { PageContainer } from '@/components/PageContainer';
import { Modal, PageHeader, SectionHeader, Toast } from '@/components/workspace';
import { formatCurrency, formatDateTime, humanize, paymentStatusTone } from '@/lib/format';

export default function TransactionsPage() {
  const [query, setQuery] = useState('');
  const [direction, setDirection] = useState<'all' | 'inbound' | 'outbound'>('all');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState<MockTransaction | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return transactions.filter((transaction) => {
      const matchesQuery =
        !normalized ||
        transaction.description.toLowerCase().includes(normalized) ||
        transaction.counterparty.toLowerCase().includes(normalized) ||
        transaction.reference.toLowerCase().includes(normalized);
      const matchesDirection = direction === 'all' || transaction.direction === direction;
      const matchesStatus = status === 'all' || transaction.status === status;
      return matchesQuery && matchesDirection && matchesStatus;
    });
  }, [direction, query, status]);

  const inboundTotal = transactions
    .filter((transaction) => transaction.direction === 'inbound')
    .reduce((sum, transaction) => sum + Number(transaction.amount.amount), 0);
  const outboundTotal = transactions
    .filter((transaction) => transaction.direction === 'outbound')
    .reduce((sum, transaction) => sum + Number(transaction.amount.amount), 0);

  function exportCsv(): void {
    const header = ['Reference', 'Description', 'Counterparty', 'Direction', 'Status', 'Amount', 'Currency', 'Created'];
    const rows = filtered.map((transaction) => [
      transaction.reference,
      transaction.description,
      transaction.counterparty,
      transaction.direction,
      transaction.status,
      transaction.amount.amount,
      transaction.amount.currency,
      transaction.createdAt,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'paymentflow-transactions.csv';
    anchor.click();
    URL.revokeObjectURL(url);
    setToast(`${filtered.length} transactions exported.`);
  }

  return (
    <PageContainer>
      <div className="page-stack">
        <PageHeader
          eyebrow="Ledger"
          title="Transactions"
          description="Search, inspect, and export the complete movement history across your wallets."
          actions={<Button onClick={exportCsv}>Export CSV</Button>}
        />

        <section className="transaction-summary" aria-label="Transaction totals">
          <Card className="transaction-summary__card transaction-summary__card--positive">
            <span>Inbound value</span>
            <strong>${inboundTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
            <small>Across {transactions.filter((transaction) => transaction.direction === 'inbound').length} transactions</small>
          </Card>
          <Card className="transaction-summary__card">
            <span>Outbound value</span>
            <strong>${outboundTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
            <small>Across {transactions.filter((transaction) => transaction.direction === 'outbound').length} transactions</small>
          </Card>
          <Card className="transaction-summary__card">
            <span>Fees paid</span>
            <strong>$1,480.78</strong>
            <small>0.07% effective average</small>
          </Card>
        </section>

        <section aria-labelledby="transaction-ledger-heading">
          <SectionHeader
            id="transaction-ledger-heading"
            title="Transaction ledger"
            description={`${filtered.length} matching records`}
          />
          <div className="filter-bar">
            <Input
              label="Search transactions"
              className="filter-bar__search"
              placeholder="Reference, beneficiary, or description"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <label className="select-field select-field--compact">
              <span>Direction</span>
              <select value={direction} onChange={(event) => setDirection(event.target.value as typeof direction)}>
                <option value="all">All directions</option>
                <option value="inbound">Inbound</option>
                <option value="outbound">Outbound</option>
              </select>
            </label>
            <label className="select-field select-field--compact">
              <span>Status</span>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="all">All statuses</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending_fraud_check">Fraud review</option>
                <option value="fraud_approved">Approved</option>
              </select>
            </label>
          </div>

          <Card className="table-card">
            <div className="responsive-table responsive-table--transactions" role="table" aria-label="Transactions">
              <div className="responsive-table__header" role="row">
                <span role="columnheader">Transaction</span>
                <span role="columnheader">Counterparty</span>
                <span role="columnheader">Date</span>
                <span role="columnheader">Amount</span>
                <span role="columnheader">Status</span>
              </div>
              {filtered.map((transaction) => (
                <button key={transaction.id} type="button" className="responsive-table__row" role="row" onClick={() => setSelected(transaction)}>
                  <span role="cell" data-label="Transaction">
                    <span className={`table-direction-icon table-direction-icon--${transaction.direction}`} aria-hidden="true">{transaction.direction === 'inbound' ? '↓' : '↑'}</span>
                    <span><strong>{transaction.description}</strong><small>{transaction.reference}</small></span>
                  </span>
                  <span role="cell" data-label="Counterparty">{transaction.counterparty}</span>
                  <span role="cell" data-label="Date">{formatDateTime(transaction.createdAt)}</span>
                  <span role="cell" data-label="Amount" className={`numeric-cell${transaction.direction === 'inbound' ? ' amount-positive' : ''}`}>
                    {transaction.direction === 'inbound' ? '+' : '−'}{formatCurrency(transaction.amount.amount, transaction.amount.currency)}
                  </span>
                  <span role="cell" data-label="Status"><Badge variant={paymentStatusTone(transaction.status)}>{humanize(transaction.status)}</Badge></span>
                </button>
              ))}
              {filtered.length === 0 && <div className="table-empty">No transactions match your filters.</div>}
            </div>
          </Card>
        </section>
      </div>

      <Modal
        open={Boolean(selected)}
        title={selected?.description ?? 'Transaction details'}
        description={selected?.reference}
        onClose={() => setSelected(null)}
        footer={<Button variant="ghost" onClick={() => setToast('Receipt prepared in demo mode.')}>Download receipt</Button>}
      >
        {selected && (
          <div className="transaction-detail">
            <div className={`transaction-detail__amount${selected.direction === 'inbound' ? ' amount-positive' : ''}`}>
              {selected.direction === 'inbound' ? '+' : '−'}{formatCurrency(selected.amount.amount, selected.amount.currency)}
            </div>
            <dl className="detail-list detail-list--modal">
              <div><dt>Counterparty</dt><dd>{selected.counterparty}</dd></div>
              <div><dt>Status</dt><dd>{humanize(selected.status)}</dd></div>
              <div><dt>Method</dt><dd>{humanize(selected.method)}</dd></div>
              <div><dt>Fee</dt><dd>{formatCurrency(selected.fee.amount, selected.fee.currency)}</dd></div>
              <div><dt>Currency route</dt><dd>{selected.sourceCurrency} → {selected.destinationCurrency}</dd></div>
              <div><dt>Created</dt><dd>{formatDateTime(selected.createdAt)}</dd></div>
            </dl>
          </div>
        )}
      </Modal>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </PageContainer>
  );
}
