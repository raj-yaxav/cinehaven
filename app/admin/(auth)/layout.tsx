import { ReactNode } from 'react';

// This layout is for auth pages (login) and doesn't require authentication
export default function AdminAuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}