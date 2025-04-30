'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/app/context/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading, logout } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Include the current path as a redirect parameter
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, loading, router, pathname]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Toaster position='top-right' />

      {/* Admin Header */}
      <header className='bg-white shadow'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Admin Dashboard</h1>
          <div className='flex space-x-4'>
            <Link
              href='/admin'
              className='px-3 py-2 text-sm rounded hover:bg-gray-100'
            >
              Dashboard
            </Link>
            <Link
              href='/admin/press'
              className='px-3 py-2 text-sm rounded hover:bg-gray-100'
            >
              Press Management
            </Link>
            <button
              onClick={handleLogout}
              className='px-3 py-2 text-sm text-red-600 rounded hover:bg-red-50'
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
