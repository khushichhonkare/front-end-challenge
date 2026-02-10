// src/app/(auth)/login/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/dashboard'); // Redirect authenticated users
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      {/* Left: form panel (matches Figma sign-in layout) */}
      <div className="flex min-h-screen flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              Slooze Commodities
            </p>
            <h1 className="mt-6 text-3xl font-semibold leading-tight">
              Welcome Back
            </h1>
            <p className="mt-1 text-sm text-indigo-200">Sign Up For Free</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-xs font-medium uppercase tracking-[0.16em] text-indigo-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full rounded-[12px] border border-indigo-500/40 bg-[#020617] px-3 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-indigo-500/70 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-[0.16em] text-indigo-200"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full rounded-[12px] border border-indigo-500/40 bg-[#020617] px-3 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-indigo-500/70 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                defaultChecked
                className="h-3.5 w-3.5 rounded border-indigo-500/60 bg-transparent text-[#7c3aed] focus:ring-[#7c3aed]"
              />
              <label
                htmlFor="terms"
                className="text-[11px] text-indigo-200/90"
              >
                I agree to all Term, Privacy Policy and fees
              </label>
            </div>

            {error && (
              <p className="pt-1 text-xs text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-[999px] bg-[#7c3aed] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#7c3aed]/40 transition hover:bg-[#6d28d9] disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in…' : 'Get Started'}
            </button>
          </form>

          {/* OR divider */}
          <div className="mt-6 flex items-center gap-3 text-[11px] text-indigo-200/80">
            <span className="h-px flex-1 bg-indigo-900" />
            <span>OR</span>
            <span className="h-px flex-1 bg-indigo-900" />
          </div>

          {/* Social sign-in buttons – visual only */}
          <div className="mt-4 space-y-3 text-[13px]">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-[999px] border border-indigo-500/40 bg-transparent px-4 py-2 text-indigo-100 hover:bg-indigo-900/40"
            >
              <span className="text-lg">G</span>
              <span>Sign in with Google</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-[999px] border border-indigo-500/40 bg-transparent px-4 py-2 text-indigo-100 hover:bg-indigo-900/40"
            >
              <span className="text-lg">f</span>
              <span>Sign in with Facebook</span>
            </button>
          </div>

          <p className="mt-6 text-center text-[11px] text-indigo-200/90">
            Already have an account?{' '}
            <span className="cursor-pointer text-white underline underline-offset-2">
              Login
            </span>
          </p>

          <div className="mt-6 space-y-1 text-center text-[11px] text-indigo-300/90">
            <p>
              <span className="font-medium text-white">Manager</span>:
              manager@slooze.com / password
            </p>
            <p>
              <span className="font-medium text-white">Store Keeper</span>:
              storekeeper@slooze.com / password
            </p>
          </div>
        </div>
      </div>

      {/* Right: artwork gradient panel */}
      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0ea5e9]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,113,133,0.55),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.65),transparent_55%)] mix-blend-screen" />
        <div className="absolute inset-10 rounded-[40px] bg-gradient-to-br from-white/10 via-white/5 to-transparent shadow-[0_40px_120px_rgba(15,23,42,0.9)] backdrop-blur-3xl" />
      </div>
    </div>
  );
}
