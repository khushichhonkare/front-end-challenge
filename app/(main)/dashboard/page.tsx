// src/app/(main)/dashboard/page.tsx
'use client';

import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Top header bar */}
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
            Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
            Store performance
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-56 rounded-[999px] border border-[var(--border)] bg-[var(--muted-soft)] px-3 pr-9 text-xs text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:bg-[var(--card)]"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[10px] text-[var(--muted)]">
              ⌕
            </span>
          </div>

          <button
            type="button"
            className="inline-flex items-center rounded-[999px] border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--muted-soft)]"
          >
            Today
          </button>

          <button
            type="button"
            className="inline-flex items-center rounded-[999px] bg-[var(--primary)] px-4 py-2 text-xs font-medium text-[var(--primary-foreground)] shadow-sm hover:bg-[var(--primary-hover)]"
          >
            Export report
          </button>
        </div>
      </header>

      {/* First row – KPI cards */}
      <section className="grid gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Earning', value: '$112,893.00', delta: '+ 82%' },
          { label: 'Views', value: '+ 112,893', delta: '+ 12%' },
          { label: 'Total Sales', value: '+ 112,893', delta: '+ 24%' },
          { label: 'Subscriptions', value: '+ 112,893', delta: '+ 40%' },
        ].map((card) => (
          <article
            key={card.label}
            className="app-page-card flex flex-col gap-3 px-5 py-4"
          >
            <header className="flex items-center justify-between text-[11px] text-[var(--muted)]">
              <p className="font-medium uppercase tracking-[0.16em]">
                {card.label}
              </p>
              <span className="rounded-full bg-[var(--primary-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--primary)]">
                {card.delta}
              </span>
            </header>
            <p className="text-xl font-semibold text-[var(--foreground)]">
              {card.value}
            </p>
            <div className="mt-auto h-12 rounded-[10px] bg-gradient-to-t from-[rgba(249,115,22,0.18)] via-[rgba(249,115,22,0.05)] to-transparent dark:from-[rgba(249,115,22,0.35)] dark:via-[rgba(15,23,42,0.9)]" />
          </article>
        ))}
      </section>

      {/* Second row – overview + recent sales */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.1fr)]">
        {/* Overview chart */}
        <article className="app-page-card flex flex-col px-5 py-4">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                Overview
              </p>
              <h2 className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                Revenue by month
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[var(--muted)]">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#f97316]" />
                Earning
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                Spend
              </span>
            </div>
          </header>

          <div className="flex flex-1 items-end gap-3 border-t border-[var(--border)] pt-6">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
              (month, index) => (
                <div key={month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full items-end gap-1 rounded-[8px] bg-[var(--muted-soft)] px-1.5 pb-1.5 pt-2">
                    <span
                      className="inline-block w-1.5 rounded-full bg-[#f97316]"
                      style={{ height: `${40 + (index % 5) * 8}px` }}
                    />
                    <span
                      className="inline-block w-1.5 rounded-full bg-[#22c55e]"
                      style={{ height: `${24 + ((index + 2) % 5) * 7}px` }}
                    />
                  </div>
                  <span className="text-[10px] text-[var(--muted)]">
                    {month}
                  </span>
                </div>
              ),
            )}
          </div>
        </article>

        {/* Recent sales list */}
        <article className="app-page-card flex flex-col px-5 py-4">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                Recent sales
              </p>
              <h2 className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                Latest activity
              </h2>
            </div>
            <button
              type="button"
              className="rounded-[999px] border border-[var(--border)] px-3 py-1 text-[11px] font-medium text-[var(--muted)] hover:bg-[var(--muted-soft)]"
            >
              View all
            </button>
          </header>

          <ul className="space-y-3 text-[13px]">
            {[
              {
                name: 'Iphone 12 Pro',
                time: '2 min ago',
                amount: '+ $1,200',
              },
              {
                name: 'Macbook Pro 2023',
                time: '8 min ago',
                amount: '+ $2,400',
              },
              {
                name: 'Apple Watch Series 9',
                time: '21 min ago',
                amount: '+ $640',
              },
              {
                name: 'AirPods Max',
                time: '1 hour ago',
                amount: '+ $480',
              },
            ].map((sale) => (
              <li
                key={sale.name}
                className="flex items-center justify-between rounded-[10px] bg-[var(--muted-soft)] px-3 py-2.5"
              >
                <div>
                  <p className="text-[var(--foreground)]">{sale.name}</p>
                  <p className="text-[11px] text-[var(--muted)]">{sale.time}</p>
                </div>
                <p className="text-sm font-semibold text-emerald-500">
                  {sale.amount}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Third row – bottom stats strip */}
      <section className="grid gap-4 lg:grid-cols-4">
        {[
          'Total Earning',
          'Total Sales',
          'Total Views',
          'Subscriptions Performers',
        ].map((label, index) => (
          <article
            key={label}
            className="app-page-card flex flex-col justify-between px-5 py-4"
          >
            <header className="flex items-center justify-between text-[11px] text-[var(--muted)]">
              <p className="font-medium uppercase tracking-[0.16em]">
                {label}
              </p>
              <span className="text-[10px]">Nov 20th — Dec 20th</span>
            </header>

            <div className="mt-4 h-20 rounded-[10px] bg-[radial-gradient(circle_at_10%_0%,rgba(249,115,22,0.65),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(96,165,250,0.5),transparent_55%),linear-gradient(to_top,rgba(15,23,42,0.95),rgba(15,23,42,0.7))] dark:bg-[radial-gradient(circle_at_10%_0%,rgba(249,115,22,0.85),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(96,165,250,0.8),transparent_55%),linear-gradient(to_top,rgba(15,23,42,1),rgba(15,23,42,0.85))]" />

            {index === 3 && (
              <p className="mt-3 text-xs font-semibold text-emerald-500">
                +500
              </p>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};

export default DashboardPage;