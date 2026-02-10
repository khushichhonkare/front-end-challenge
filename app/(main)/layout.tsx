// src/app/(main)/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
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
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && user?.role === 'Store Keeper' && window.location.pathname === '/dashboard') {
      router.push('/products');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--background)' }}>
        <p className="text-[var(--muted)]">Loading...</p>
      </div>
    );
  }

  const navLink = (href: string, label: string) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`flex items-center gap-2 rounded-[var(--radius)] px-3 py-2 text-sm font-medium transition-colors ${
          isActive ? 'bg-[var(--primary-soft)] text-[var(--primary)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="app-shell">
      {/* Primary sidebar (icon rail) */}
      <aside className="flex w-16 flex-col items-center border-r border-[var(--border)] bg-[#020617] py-6">
        <div className="mb-8 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-xs font-semibold text-[var(--primary)]">
          SL
        </div>
        <div className="flex flex-1 flex-col items-center gap-4 text-[11px] text-[var(--muted)]">
          {user?.role === 'Manager' && (
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-medium transition-colors ${
                pathname === '/dashboard'
                  ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              D
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push('/products')}
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-medium transition-colors ${
              pathname === '/products'
                ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                : 'text-[var(--muted)] hover:text-[var(--foreground)]'
            }`}
          >
            P
          </button>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="mt-auto flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[10px] text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          {theme === 'light' ? '☾' : '☼'}
        </button>
      </aside>

      {/* Secondary sidebar + content */}
      <aside className="flex w-56 flex-col border-r border-[var(--border)] bg-[var(--card)]/95 px-5 py-6">
        <div className="mb-8">
          <h2 className="text-sm font-semibold tracking-tight text-[var(--foreground)]">Slooze</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">Commodity manager</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 text-xs">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
            Navigation
          </p>
          {user?.role === 'Manager' && navLink('/dashboard', 'Dashboard')}
          {navLink('/products', 'Products')}
        </nav>

        <div className="mt-6 border-t border-[var(--border)] pt-4 text-xs">
          <button
            type="button"
            onClick={logout}
            className="w-full text-left text-[11px] font-medium text-[var(--danger)] hover:opacity-80"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="app-shell-main">{children}</main>
    </div>
  );
}
