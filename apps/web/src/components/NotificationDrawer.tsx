'use client';

import { useState } from 'react';
import { notifications as initialNotifications } from '@paymentflow/mock-data';
import { Badge, Button } from '@paymentflow/ui';
import { formatRelativeTime } from '@/lib/format';

export interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ open, onClose }: NotificationDrawerProps) {
  const [readIds, setReadIds] = useState<Set<string>>(
    () => new Set(initialNotifications.filter((notification) => notification.read).map((notification) => notification.id)),
  );

  if (!open) return null;

  const unreadCount = initialNotifications.filter((notification) => !readIds.has(notification.id)).length;

  return (
    <div className="drawer" role="presentation">
      <button type="button" className="drawer__backdrop" aria-label="Close notifications" onClick={onClose} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="notification-drawer-heading">
        <header className="drawer__header">
          <div><span className="workspace-page-header__eyebrow">Workspace updates</span><h2 id="notification-drawer-heading">Notifications</h2></div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close notifications">×</button>
        </header>
        <div className="drawer__toolbar">
          <Badge variant={unreadCount > 0 ? 'info' : 'default'}>{unreadCount} unread</Badge>
          <Button variant="ghost" onClick={() => setReadIds(new Set(initialNotifications.map((notification) => notification.id)))}>Mark all read</Button>
        </div>
        <div className="drawer__content">
          {initialNotifications.map((notification) => {
            const isRead = readIds.has(notification.id);
            return (
              <button key={notification.id} type="button" className={`drawer-notification${isRead ? '' : ' drawer-notification--unread'}`} onClick={() => setReadIds((current) => new Set([...current, notification.id]))}>
                <span className="drawer-notification__indicator" aria-hidden="true" />
                <span><strong>{notification.title}</strong><small>{notification.message}</small><time dateTime={notification.createdAt}>{formatRelativeTime(notification.createdAt)}</time></span>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
