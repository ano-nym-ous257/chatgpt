'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { CommandPalette } from './CommandPalette';
import { NotificationDrawer } from './NotificationDrawer';
import { MobileNav } from './MobileNav';
import { MotionOrchestrator } from './MotionOrchestrator';

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
    setSearchOpen(false);
    setNotificationsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setSidebarOpen(false);
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSidebar = useCallback(() => setSidebarOpen((previous) => !previous), []);
  const handleCloseSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header
        onMenuToggle={handleToggleSidebar}
        onSearchOpen={() => setSearchOpen(true)}
        onNotificationsOpen={() => setNotificationsOpen(true)}
      />
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      {sidebarOpen && <button className="shell__overlay" onClick={handleCloseSidebar} aria-label="Close navigation" type="button" />}
      <main key={pathname} id="main-content" className="shell__main shell__main--route" role="main">{children}</main>
      <MotionOrchestrator />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <MobileNav />
    </div>
  );
}
