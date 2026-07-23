'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Card, Grid, Input } from '@paymentflow/ui';
import { wallets as initialWallets, type MockWallet } from '@paymentflow/mock-data';
import type { CurrencyCode } from '@paymentflow/shared-types';
import { PageContainer } from '@/components/PageContainer';
import { MetricCard, Modal, PageHeader, SectionHeader, Toast } from '@/components/workspace';
import { formatCurrency, humanize } from '@/lib/format';

const AVAILABLE_CURRENCIES: readonly CurrencyCode[] = ['USD', 'EUR', 'GBP', 'GHS', 'NGN', 'KES'];

export default function WalletsPage() {
  const [wallets, setWallets] = useState<MockWallet[]>(initialWallets);
  const [selectedWallet, setSelectedWallet] = useState<MockWallet>(initialWallets[0]!);
  const [createOpen, setCreateOpen] = useState(false);
  const [fundOpen, setFundOpen] = useState(false);
  const [newWalletName, setNewWalletName] = useState('');
  const [newWalletCurrency, setNewWalletCurrency] = useState<CurrencyCode>('GHS');
  const [fundAmount, setFundAmount] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const totals = useMemo(() => {
    const available = wallets.reduce((sum, wallet) => sum + Number(wallet.balance.amount), 0);
    const pending = wallets.reduce((sum, wallet) => sum + Number(wallet.pendingBalance.amount), 0);
    const reserved = wallets.reduce((sum, wallet) => sum + Number(wallet.reservedBalance.amount), 0);
    return { available, pending, reserved };
  }, [wallets]);

  function createWallet(): void {
    if (!newWalletName.trim()) return;

    const wallet: MockWallet = {
      id: `w_demo_${Date.now()}`,
      name: newWalletName.trim(),
      ownerId: 'usr_demo',
      type: 'business',
      status: 'active',
      currency: newWalletCurrency,
      balance: { amount: '0.00', currency: newWalletCurrency },
      pendingBalance: { amount: '0.00', currency: newWalletCurrency },
      reservedBalance: { amount: '0.00', currency: newWalletCurrency },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setWallets((current) => [...current, wallet]);
    setSelectedWallet(wallet);
    setCreateOpen(false);
    setNewWalletName('');
    setToast(`${wallet.name} created in demo mode.`);
  }

  function fundWallet(): void {
    const amount = Number(fundAmount);
    if (!Number.isFinite(amount) || amount <= 0) return;

    setWallets((current) =>
      current.map((wallet) =>
        wallet.id === selectedWallet.id
          ? {
              ...wallet,
              balance: {
                ...wallet.balance,
                amount: (Number(wallet.balance.amount) + amount).toFixed(2),
              },
              updatedAt: new Date().toISOString(),
            }
          : wallet,
      ),
    );
    setSelectedWallet((wallet) => ({
      ...wallet,
      balance: { ...wallet.balance, amount: (Number(wallet.balance.amount) + amount).toFixed(2) },
    }));
    setFundAmount('');
    setFundOpen(false);
    setToast(`Demo funds added to ${selectedWallet.name}.`);
  }

  return (
    <PageContainer>
      <div className="page-stack">
        <PageHeader
          eyebrow="Treasury"
          title="Wallets"
          description="Manage operating balances, reserves, and currency exposure from one workspace."
          actions={
            <div className="button-row">
              <Button variant="ghost" onClick={() => setFundOpen(true)}>Add funds</Button>
              <Button onClick={() => setCreateOpen(true)}>Create wallet</Button>
            </div>
          }
        />

        <section aria-label="Wallet summary">
          <Grid columns={4} gap="16px" minChildWidth="210px">
            <MetricCard label="Active wallets" value={String(wallets.length)} change="Business workspace" icon="▣" />
            <MetricCard label="Currencies" value={String(new Set(wallets.map((wallet) => wallet.currency)).size)} change="Global coverage" icon="◎" />
            <MetricCard label="Pending balances" value={`$${totals.pending.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} change="Across native currencies" icon="◷" />
            <MetricCard label="Reserved funds" value={`$${totals.reserved.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} change="Protected for obligations" icon="◇" />
          </Grid>
        </section>

        <div className="content-split content-split--wallets">
          <section aria-labelledby="wallet-list-heading">
            <SectionHeader
              id="wallet-list-heading"
              title="All wallets"
              description="Select a wallet to inspect its available, pending, and reserved balances."
            />
            <div className="wallet-list">
              {wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  className={`wallet-list-item${selectedWallet.id === wallet.id ? ' wallet-list-item--selected' : ''}`}
                  onClick={() => setSelectedWallet(wallet)}
                >
                  <span className="wallet-list-item__currency">{wallet.currency}</span>
                  <span className="wallet-list-item__copy">
                    <strong>{wallet.name}</strong>
                    <small>{humanize(wallet.type)} · {humanize(wallet.status)}</small>
                  </span>
                  <span className="wallet-list-item__balance">
                    {formatCurrency(wallet.balance.amount, wallet.currency)}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <aside aria-labelledby="wallet-detail-heading">
            <SectionHeader id="wallet-detail-heading" title="Wallet details" />
            <Card className="wallet-detail-card">
              <div className="wallet-detail-card__hero">
                <div>
                  <span className="wallet-detail-card__currency">{selectedWallet.currency}</span>
                  <h2>{selectedWallet.name}</h2>
                  <Badge variant={selectedWallet.status === 'active' ? 'success' : 'warning'}>
                    {humanize(selectedWallet.status)}
                  </Badge>
                </div>
                <span className="wallet-detail-card__mark" aria-hidden="true">PF</span>
              </div>
              <div className="wallet-detail-card__balance">
                <span>Available balance</span>
                <strong>{formatCurrency(selectedWallet.balance.amount, selectedWallet.currency)}</strong>
              </div>
              <dl className="detail-list">
                <div><dt>Pending</dt><dd>{formatCurrency(selectedWallet.pendingBalance.amount, selectedWallet.currency)}</dd></div>
                <div><dt>Reserved</dt><dd>{formatCurrency(selectedWallet.reservedBalance.amount, selectedWallet.currency)}</dd></div>
                <div><dt>Wallet type</dt><dd>{humanize(selectedWallet.type)}</dd></div>
                <div><dt>Last updated</dt><dd>Today, 8:22 AM</dd></div>
              </dl>
              <div className="button-row button-row--full">
                <Button onClick={() => setFundOpen(true)}>Add funds</Button>
                <Button variant="ghost" onClick={() => setToast('Statement download prepared in demo mode.')}>Download statement</Button>
              </div>
            </Card>
          </aside>
        </div>

        <section aria-labelledby="wallet-controls-heading">
          <SectionHeader
            id="wallet-controls-heading"
            title="Controls and protections"
            description="Safeguards applied to your wallets and treasury operations."
          />
          <Grid columns={3} gap="16px" minChildWidth="250px">
            <Card className="feature-card"><span aria-hidden="true">◇</span><div><h3>Reserve protection</h3><p>Reserved funds remain unavailable for ordinary transfers until obligations are released.</p></div></Card>
            <Card className="feature-card"><span aria-hidden="true">✓</span><div><h3>Approval policies</h3><p>Payments above configured limits require a second reviewer before execution.</p></div></Card>
            <Card className="feature-card"><span aria-hidden="true">✦</span><div><h3>Agent monitoring</h3><p>The Cashflow Agent monitors buffers and prepares recommendations without moving funds.</p></div></Card>
          </Grid>
        </section>
      </div>

      <Modal
        open={createOpen}
        title="Create a wallet"
        description="Add another operating currency to this business workspace."
        onClose={() => setCreateOpen(false)}
        footer={<><Button variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button><Button onClick={createWallet}>Create wallet</Button></>}
      >
        <div className="form-stack">
          <Input label="Wallet name" value={newWalletName} onChange={(event) => setNewWalletName(event.target.value)} placeholder="Ghana operations" />
          <label className="select-field">
            <span>Currency</span>
            <select value={newWalletCurrency} onChange={(event) => setNewWalletCurrency(event.target.value as CurrencyCode)}>
              {AVAILABLE_CURRENCIES.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
            </select>
          </label>
          <p className="form-note">Demo mode creates an in-browser wallet only. No financial account is opened.</p>
        </div>
      </Modal>

      <Modal
        open={fundOpen}
        title={`Add funds to ${selectedWallet.name}`}
        description="Simulate a wallet top-up for this deployable product demonstration."
        onClose={() => setFundOpen(false)}
        footer={<><Button variant="ghost" onClick={() => setFundOpen(false)}>Cancel</Button><Button onClick={fundWallet}>Add demo funds</Button></>}
      >
        <div className="form-stack">
          <Input label={`Amount (${selectedWallet.currency})`} inputMode="decimal" value={fundAmount} onChange={(event) => setFundAmount(event.target.value)} placeholder="0.00" />
          <p className="form-note">This action changes local demo state only and does not move real money.</p>
        </div>
      </Modal>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </PageContainer>
  );
}
