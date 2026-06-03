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
    <div className="admin-shell min-h-screen bg-midnight text-ivory md:flex">
      <AdminSidebar />
      <div className="flex min-h-screen flex-1 flex-col md:ml-64">
        <AdminHeader />
        <main className="flex-1 overflow-auto px-2 py-5 sm:px-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
