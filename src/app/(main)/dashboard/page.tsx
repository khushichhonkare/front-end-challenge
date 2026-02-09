// src/app/(main)/dashboard/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== 'Manager') {
      router.push('/products'); // Redirect non-managers
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.role !== 'Manager') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Mock Statistics Cards */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
            Total Products
          </h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            1,234
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
            Product Categories
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            12
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
            Low Stock Items
          </h2>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            45
          </p>
        </div>
      </div>
    </div>
  );
}
