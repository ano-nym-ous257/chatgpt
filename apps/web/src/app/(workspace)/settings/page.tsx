'use client';

import { useState } from 'react';
import { Badge, Button, Card, Input } from '@paymentflow/ui';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader, SectionHeader, Toast } from '@/components/workspace';
import { useAuth } from '@/providers/auth-provider';
import { useTheme } from '@/providers/theme-provider';

const TABS = ['Profile', 'Preferences', 'Security', 'Notifications'] as const;
type Tab = (typeof TABS)[number];

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const [tab, setTab] = useState<Tab>('Profile');
  const [toast, setToast] = useState<string | null>(null);
  const [name, setName] = useState(user?.name ?? 'Michael Richardson');
  const [email, setEmail] = useState(user?.email ?? 'michael@northstar.example');
  const [company, setCompany] = useState(user?.company ?? 'Northstar Commerce Ltd.');
  const [compactMode, setCompactMode] = useState(false);
  const [agentPersonalization, setAgentPersonalization] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [paymentUpdates, setPaymentUpdates] = useState(true);

  function save(message = 'Settings saved successfully.'): void {
    setToast(message);
  }

  return (
    <PageContainer>
      <div className="page-stack">
        <PageHeader
          eyebrow="Workspace administration"
          title="Settings"
          description="Manage your profile, product preferences, security controls, and communication settings."
          actions={<Badge variant="success">Workspace healthy</Badge>}
        />

        <div className="settings-layout">
          <nav className="settings-nav" aria-label="Settings sections">
            {TABS.map((item) => (
              <button key={item} type="button" className={tab === item ? 'settings-nav__item settings-nav__item--active' : 'settings-nav__item'} onClick={() => setTab(item)}>
                {item}
              </button>
            ))}
          </nav>

          <div className="settings-content">
            {tab === 'Profile' && (
              <section aria-labelledby="profile-settings-heading">
                <SectionHeader id="profile-settings-heading" title="Profile and business" description="Information shown across the PaymentFlow workspace." />
                <Card className="settings-card">
                  <div className="profile-identity">
                    <span className="profile-identity__avatar">{user?.initials ?? 'PF'}</span>
                    <div><h3>{name}</h3><p>{user?.role ?? 'Workspace member'} · Enterprise workspace</p></div>
                    <Button variant="ghost" onClick={() => save('Profile image upload will be available with persistent storage.')}>Change photo</Button>
                  </div>
                  <div className="form-grid">
                    <Input label="Full name" value={name} onChange={(event) => setName(event.target.value)} />
                    <Input label="Work email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <Input label="Business name" value={company} onChange={(event) => setCompany(event.target.value)} />
                    <label className="select-field"><span>Role</span><select defaultValue="finance-manager"><option value="finance-manager">Finance Manager</option><option value="owner">Business Owner</option><option value="accountant">Accountant</option></select></label>
                  </div>
                  <div className="settings-card__footer"><Button onClick={() => { updateProfile({ name, email, company }); save(); }}>Save profile</Button></div>
                </Card>
              </section>
            )}

            {tab === 'Preferences' && (
              <section aria-labelledby="preference-settings-heading">
                <SectionHeader id="preference-settings-heading" title="Experience preferences" description="Control how information and AI recommendations appear in your workspace." />
                <Card className="settings-card">
                  <div className="setting-row setting-row--appearance">
                    <div><h3>Appearance</h3><p>Choose the theme that feels most comfortable for your workspace.</p></div>
                    <div className="theme-choice" role="group" aria-label="Appearance theme">
                      <button type="button" className={theme === 'light' ? 'theme-choice__button theme-choice__button--active' : 'theme-choice__button'} onClick={() => setTheme('light')} aria-pressed={theme === 'light'}>☀ Light</button>
                      <button type="button" className={theme === 'dark' ? 'theme-choice__button theme-choice__button--active' : 'theme-choice__button'} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'}>◐ Dark</button>
                    </div>
                  </div>
                  <div className="setting-row">
                    <div><h3>AI dashboard personalization</h3><p>Allow agents to prioritize modules and recommendations based on your tasks and financial context.</p></div>
                    <label className="switch"><input type="checkbox" checked={agentPersonalization} onChange={(event) => setAgentPersonalization(event.target.checked)} /><span /></label>
                  </div>
                  <div className="setting-row">
                    <div><h3>Compact data layout</h3><p>Display denser tables and cards on large screens.</p></div>
                    <label className="switch"><input type="checkbox" checked={compactMode} onChange={(event) => setCompactMode(event.target.checked)} /><span /></label>
                  </div>
                  <div className="form-grid">
                    <label className="select-field"><span>Default currency</span><select defaultValue="USD"><option>USD</option><option>EUR</option><option>GBP</option><option>GHS</option><option>NGN</option><option>KES</option></select></label>
                    <label className="select-field"><span>Time zone</span><select defaultValue="Africa/Accra"><option value="Africa/Accra">Africa/Accra (GMT)</option><option value="Europe/London">Europe/London</option><option value="America/New_York">America/New_York</option></select></label>
                    <label className="select-field"><span>Date format</span><select defaultValue="medium"><option value="medium">Jul 16, 2026</option><option value="numeric">16/07/2026</option><option value="us">07/16/2026</option></select></label>
                    <label className="select-field"><span>Language</span><select defaultValue="English"><option>English</option><option>French</option><option>Spanish</option></select></label>
                  </div>
                  <div className="settings-card__footer"><Button onClick={() => save('Experience preferences saved.')}>Save preferences</Button></div>
                </Card>
              </section>
            )}

            {tab === 'Security' && (
              <section aria-labelledby="security-settings-heading">
                <SectionHeader id="security-settings-heading" title="Security and access" description="Review protection controls for this demonstration workspace." badge={<Badge variant="success">Strong</Badge>} />
                <div className="settings-card-stack">
                  <Card className="security-control"><span className="security-control__icon">✓</span><div><h3>Multi-factor authentication</h3><p>TOTP authentication is enabled for {user?.name ?? 'this user'}.</p></div><Button variant="ghost" onClick={() => save('MFA management opened in demo mode.')}>Manage</Button></Card>
                  <Card className="security-control"><span className="security-control__icon">◇</span><div><h3>Approval policy</h3><p>Large payments require two approvers and compliance review.</p></div><Button variant="ghost" onClick={() => save('Approval policy is read-only in this demo.')}>Review</Button></Card>
                  <Card className="security-control"><span className="security-control__icon">◎</span><div><h3>Active sessions</h3><p>2 trusted sessions · MacBook Pro and mobile device.</p></div><Button variant="ghost" onClick={() => save('Other demo sessions revoked.')}>Revoke others</Button></Card>
                  <Card className="security-control"><span className="security-control__icon">↻</span><div><h3>Password</h3><p>Last changed 42 days ago.</p></div><Button variant="ghost" onClick={() => save('Password change requires production authentication.')}>Change password</Button></Card>
                </div>
              </section>
            )}

            {tab === 'Notifications' && (
              <section aria-labelledby="notification-settings-heading">
                <SectionHeader id="notification-settings-heading" title="Notification preferences" description="Choose which updates reach you outside the workspace." />
                <Card className="settings-card">
                  <div className="setting-row"><div><h3>Email summaries</h3><p>Daily digest of balances, payments, and agent recommendations.</p></div><label className="switch"><input type="checkbox" checked={emailNotifications} onChange={(event) => setEmailNotifications(event.target.checked)} /><span /></label></div>
                  <div className="setting-row"><div><h3>Security alerts</h3><p>Immediate alerts for new devices, login risk, and protected actions.</p></div><label className="switch"><input type="checkbox" checked={securityAlerts} onChange={(event) => setSecurityAlerts(event.target.checked)} /><span /></label></div>
                  <div className="setting-row"><div><h3>Payment updates</h3><p>Status changes for payments, refunds, and settlements.</p></div><label className="switch"><input type="checkbox" checked={paymentUpdates} onChange={(event) => setPaymentUpdates(event.target.checked)} /><span /></label></div>
                  <div className="setting-row"><div><h3>Agent recommendations</h3><p>High-confidence opportunities and tasks that require your review.</p></div><label className="switch"><input type="checkbox" checked={agentPersonalization} onChange={(event) => setAgentPersonalization(event.target.checked)} /><span /></label></div>
                  <div className="settings-card__footer"><Button onClick={() => save('Notification preferences saved.')}>Save notifications</Button></div>
                </Card>
              </section>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </PageContainer>
  );
}
