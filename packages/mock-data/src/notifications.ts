export type NotificationType = 'payment' | 'exchange' | 'compliance' | 'security' | 'system';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface MockNotification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const notifications: MockNotification[] = [
  {
    id: 'notif_01A1B2C3D4E5F6G7',
    type: 'payment',
    priority: 'high',
    title: 'Large inbound transfer received',
    message: '₦2,500,000.00 received from Adekunle Holdings PLC. Pending fraud review.',
    read: false,
    createdAt: '2026-07-16T08:15:00Z',
  },
  {
    id: 'notif_02B2C3D4E5F6G7H8',
    type: 'exchange',
    priority: 'medium',
    title: 'USD/NGN rate crossed threshold',
    message: 'USD/NGN moved above ₦1,540 — up 0.23% since market open.',
    read: false,
    createdAt: '2026-07-16T07:45:00Z',
  },
  {
    id: 'notif_03C3D4E5F6G7H8I9',
    type: 'compliance',
    priority: 'high',
    title: 'KYC document expiring',
    message: 'Business registration certificate expires in 14 days. Upload renewed document.',
    read: false,
    createdAt: '2026-07-16T06:00:00Z',
  },
  {
    id: 'notif_04D4E5F6G7H8I9J0',
    type: 'payment',
    priority: 'medium',
    title: 'Payroll batch processing',
    message: 'July GBP payroll for 12 recipients is now processing. Estimated completion: 2 hours.',
    read: true,
    createdAt: '2026-07-16T07:30:00Z',
  },
  {
    id: 'notif_05E5F6G7H8I9J0K1',
    type: 'security',
    priority: 'low',
    title: 'New device login detected',
    message:
      'Your account was accessed from a new device in London, UK. If this was not you, secure your account.',
    read: true,
    createdAt: '2026-07-15T22:10:00Z',
  },
  {
    id: 'notif_06F6G7H8I9J0K1L2',
    type: 'payment',
    priority: 'low',
    title: 'Payment completed successfully',
    message: '$8,940.00 sent to AWS Inc. Reference: VND-2026-0156.',
    read: true,
    createdAt: '2026-07-15T14:22:00Z',
  },
  {
    id: 'notif_07G7H8I9J0K1L2M3',
    type: 'system',
    priority: 'low',
    title: 'Scheduled maintenance window',
    message:
      'Platform maintenance scheduled for July 20, 02:00–04:00 UTC. Minimal service disruption expected.',
    read: true,
    createdAt: '2026-07-14T09:00:00Z',
  },
];
