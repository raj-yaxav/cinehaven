import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { getAdminFromToken } from '../../../lib/auth';

export const metadata = {
  title: 'Admin Dashboard - CineHaven',
  description: 'Manage bookings, leads, and analytics',
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Check authentication
  const admin = getAdminFromToken();
  
  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-midnight text-ivory flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
