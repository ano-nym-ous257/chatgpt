'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Card, Grid, Input } from '@paymentflow/ui';
import { exchangeRates } from '@paymentflow/mock-data';
import type { CurrencyCode } from '@paymentflow/shared-types';
import { PageContainer } from '@/components/PageContainer';
import { MetricCard, PageHeader, SectionHeader, Toast } from '@/components/workspace';
import { formatCurrency, formatRelativeTime, trendArrow } from '@/lib/format';

const CURRENCIES: readonly CurrencyCode[] = ['USD', 'EUR', 'GBP', 'NGN', 'KES'];
const CHART_POINTS = [41, 46, 43, 52, 49, 58, 62, 57, 68, 65, 73, 78, 74, 82, 88, 84, 91, 94];

function resolveRate(from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return 1;
  const direct = exchangeRates.find((rate) => rate.baseCurrency === from && rate.quoteCurrency === to);
  if (direct) return Number(direct.rate);
  const inverse = exchangeRates.find((rate) => rate.baseCurrency === to && rate.quoteCurrency === from);
  if (inverse) return 1 / Number(inverse.rate);

  const fromUsd = from === 'USD' ? 1 : resolveRate('USD', from);
  const toUsd = to === 'USD' ? 1 : resolveRate('USD', to);
  return toUsd / fromUsd;
}

export default function ExchangeRatesPage() {
  const [from, setFrom] = useState<CurrencyCode>('USD');
  const [to, setTo] = useState<CurrencyCode>('EUR');
  const [amount, setAmount] = useState('10000');
  const [alertRate, setAlertRate] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const rate = useMemo(() => resolveRate(from, to), [from, to]);
  const converted = Number(amount || 0) * rate;
  const estimatedFee = Number(amount || 0) * 0.0015;

  function swapCurrencies(): void {
    setFrom(to);
    setTo(from);
  }

  return (
    <PageContainer>
      <div className="page-stack">
        <PageHeader
          eyebrow="Global treasury"
          title="Exchange Rates"
          description="Monitor currency markets, compare routes, and prepare reviewable conversions."
          actions={<Button onClick={() => setToast('Conversion draft prepared for review in demo mode.')}>Prepare conversion</Button>}
        />

        <section aria-label="Market summary">
          <Grid columns={4} gap="16px" minChildWidth="210px">
            <MetricCard label="USD / EUR" value="0.9214" change="↑ 0.17% today" changeTone="positive" icon="$" />
            <MetricCard label="USD / GBP" value="0.7891" change="↓ 0.18% today" changeTone="negative" icon="£" />
            <MetricCard label="USD / NGN" value="1,542.30" change="↑ 0.23% today" changeTone="positive" icon="₦" />
            <MetricCard label="USD / KES" value="129.45" change="↓ 0.27% today" changeTone="negative" icon="K" />
          </Grid>
        </section>

        <div className="content-split content-split--fx">
          <section aria-labelledby="converter-heading">
            <SectionHeader
              id="converter-heading"
              title="Currency converter"
              description="Indicative demo quote. A live provider will replace mock rates in production."
            />
            <Card className="converter-card">
              <div className="converter-card__field">
                <label htmlFor="from-amount">You send</label>
                <div className="converter-card__input-row">
                  <input id="from-amount" inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} />
                  <select aria-label="Source currency" value={from} onChange={(event) => setFrom(event.target.value as CurrencyCode)}>
                    {CURRENCIES.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                  </select>
                </div>
              </div>
              <button className="converter-card__swap" type="button" onClick={swapCurrencies} aria-label="Swap currencies">⇅</button>
              <div className="converter-card__field">
                <label htmlFor="to-amount">Recipient gets</label>
                <div className="converter-card__input-row">
                  <input id="to-amount" value={converted.toFixed(2)} readOnly />
                  <select aria-label="Destination currency" value={to} onChange={(event) => setTo(event.target.value as CurrencyCode)}>
                    {CURRENCIES.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                  </select>
                </div>
              </div>
              <dl className="quote-breakdown">
                <div><dt>Indicative rate</dt><dd>1 {from} = {rate.toFixed(4)} {to}</dd></div>
                <div><dt>Estimated fee</dt><dd>{formatCurrency(estimatedFee, from)}</dd></div>
                <div><dt>Quote validity</dt><dd>30 seconds after live integration</dd></div>
              </dl>
              <Button className="full-width-button" onClick={() => setToast('Conversion draft created. Explicit approval is required before execution.')}>Review conversion</Button>
            </Card>
          </section>

          <aside aria-labelledby="market-trend-heading">
            <SectionHeader id="market-trend-heading" title={`${from}/${to} trend`} badge={<span className="live-pill"><span aria-hidden="true" />Live demo</span>} />
            <Card className="market-chart-card">
              <div className="market-chart-card__header">
                <div><span>Current indicative rate</span><strong>{rate.toFixed(4)}</strong></div>
                <Badge variant="success">+0.17%</Badge>
              </div>
              <div className="mini-chart" aria-label="Illustrative seven day market trend">
                {CHART_POINTS.map((point, index) => <span key={`${point}-${index}`} style={{ height: `${point}%` }} />)}
              </div>
              <div className="market-chart-card__axis"><span>7 days ago</span><span>Today</span></div>
              <p>Illustrative trend data for product demonstration only.</p>
            </Card>
          </aside>
        </div>

        <section aria-labelledby="rates-table-heading">
          <SectionHeader
            id="rates-table-heading"
            title="Market rates"
            description="Indicative rates monitored by the FX Agent."
            badge={<Badge variant="info">6 pairs</Badge>}
          />
          <Card className="table-card">
            <div className="responsive-table responsive-table--rates" role="table" aria-label="Exchange rates">
              <div className="responsive-table__header" role="row"><span role="columnheader">Pair</span><span role="columnheader">Rate</span><span role="columnheader">Previous</span><span role="columnheader">Change</span><span role="columnheader">Updated</span></div>
              {exchangeRates.map((marketRate) => (
                <div key={marketRate.id} className="responsive-table__row responsive-table__row--static" role="row">
                  <span role="cell" data-label="Pair"><strong>{marketRate.baseCurrency}/{marketRate.quoteCurrency}</strong></span>
                  <span role="cell" data-label="Rate" className="numeric-cell">{marketRate.rate}</span>
                  <span role="cell" data-label="Previous" className="numeric-cell">{marketRate.previousRate}</span>
                  <span role="cell" data-label="Change" className={marketRate.trend === 'down' ? 'amount-negative' : 'amount-positive'}>{trendArrow(marketRate.trend)} {marketRate.changePercent}%</span>
                  <span role="cell" data-label="Updated">{formatRelativeTime(marketRate.updatedAt)}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section aria-labelledby="rate-alert-heading">
          <SectionHeader id="rate-alert-heading" title="Rate alert" description="Ask the FX Agent to notify you when a pair reaches your preferred level." />
          <Card className="inline-form-card">
            <div>
              <h3>{from}/{to} threshold</h3>
              <p>The agent monitors the threshold and surfaces a recommendation. It never converts funds automatically.</p>
            </div>
            <Input label="Target rate" value={alertRate} onChange={(event) => setAlertRate(event.target.value)} placeholder={rate.toFixed(4)} />
            <Button onClick={() => { setToast(`Rate alert set for ${from}/${to} at ${alertRate || rate.toFixed(4)}.`); setAlertRate(''); }}>Create alert</Button>
          </Card>
        </section>
      </div>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </PageContainer>
  );
}
