import { AppShell } from '@/components/AppShell';
import { RequireAuth } from '@/features/auth';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth><AppShell>{children}</AppShell></RequireAuth>;
}
