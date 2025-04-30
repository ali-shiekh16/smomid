'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Admin Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Press Management Card */}
        <div className='bg-white rounded-lg shadow hover:shadow-md transition-shadow'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold mb-2'>Press Management</h2>
            <p className='text-gray-600 mb-4'>
              Manage press items, including ordering, adding, editing, and
              deleting.
            </p>
            <Link
              href='/admin/press'
              className='inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Manage Press Items
            </Link>
          </div>
        </div>

        {/* You can add more admin section cards here */}
      </div>
    </div>
  );
}
