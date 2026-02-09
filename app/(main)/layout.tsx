// src/app/(main)/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && user?.role === 'Store Keeper' && window.location.pathname === '/dashboard') {
      router.push('/products');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Placeholder for Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Slooze Admin
        </h2>
        <nav>
          <ul>
            {user?.role === 'Manager' && (
              <li className="mb-2">
                <a href="/dashboard" className="text-blue-600 hover:underline dark:text-blue-400">
                  Dashboard
                </a>
              </li>
            )}
            <li className="mb-2">
              <a href="/products" className="text-blue-600 hover:underline dark:text-blue-400">
                Products
              </a>
            </li>
            <li className="mb-2">
              <button
                onClick={toggleTheme}
                className="w-full text-left text-gray-600 hover:underline dark:text-gray-300"
              >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </li>
            <li>
              <button
                onClick={logout} // Call logout function
                className="text-red-600 hover:underline dark:text-red-400"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
