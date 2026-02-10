// src/app/(main)/products/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { productService } from '@/services/productService';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (deletingId || !window.confirm('Delete this product?')) return;
    setDeletingId(id);
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Page header – mirrors Figma product header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
            Product
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
            Product overview
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products"
              className="h-9 w-56 rounded-[999px] border border-[var(--border)] bg-[var(--muted-soft)] px-3 pr-8 text-xs text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:bg-[var(--card)]"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[10px] text-[var(--muted)]">
              ⌕
            </span>
          </div>

          {user?.role === 'Manager' ? (
            <Link
              href="/products/add"
              className="inline-flex items-center gap-2 rounded-[999px] bg-[var(--primary)] px-4 py-2 text-xs font-medium text-[var(--primary-foreground)] shadow-sm transition hover:bg-[var(--primary-hover)]"
            >
              <span className="text-sm leading-none">+</span>
              <span>Add product</span>
            </Link>
          ) : (
            <button
              type="button"
              disabled
              title="Manager only"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-[999px] bg-[var(--muted-soft)] px-4 py-2 text-xs font-medium text-[var(--muted)] opacity-70"
            >
              <span className="text-sm leading-none">+</span>
              <span>Add product</span>
            </button>
          )}
        </div>
      </header>

      {/* Main content – table + right-side stats card */}
      <section className="grid gap-5 lg:grid-cols-[minmax(0,3fr),minmax(0,1.15fr)]">
        {/* Table surface */}
        <article className="app-page-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
            <div className="flex items-end gap-6">
              <div>
                <h2 className="text-sm font-semibold text-[var(--foreground)]">
                  Product
                </h2>
                <p className="text-[11px] text-[var(--muted)]">
                  Manage all products in your store
                </p>
              </div>
              <div className="hidden rounded-full bg-[var(--muted-soft)] p-1 text-[11px] text-[var(--muted)] sm:flex">
                <button className="rounded-full bg-[var(--card)] px-3 py-1 font-medium text-[var(--foreground)] shadow-sm">
                  Published
                </button>
                <button className="px-3 py-1">Draft</button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-[999px] border border-[var(--border)] px-3 py-1.5 font-medium text-[var(--muted)] hover:bg-[var(--muted-soft)]"
              >
                Filter
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-[999px] border border-[var(--border)] px-3 py-1.5 font-medium text-[var(--muted)] hover:bg-[var(--muted-soft)]"
              >
                Download
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 text-xs">
              <thead>
                <tr className="bg-[var(--muted-soft)] text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  <th className="w-10 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-[var(--border)] bg-[var(--card)] text-[var(--primary)]"
                      aria-label="Select all"
                    />
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left">
                    Product Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left">
                    Views
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left">
                    Pricing
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left">
                    Revenue
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-right">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center text-[var(--muted)]"
                    >
                      Loading products…
                    </td>
                  </tr>
                )}
                {error && !loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center text-[var(--danger)]"
                    >
                      {error}
                    </td>
                  </tr>
                )}
                {!loading &&
                  !error &&
                  products.map((product, index) => {
                    const views = product.views ?? 14000;
                    const revenue =
                      product.revenue ?? product.price * product.stock;
                    return (
                      <tr
                        key={product.id}
                        className={`text-[13px] ${
                          index % 2 === 0
                            ? 'bg-[var(--card)]'
                            : 'bg-[var(--muted-soft)]/70'
                        } transition hover:bg-[var(--primary-soft)]/60`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5 rounded border-[var(--border)] bg-[var(--card)] text-[var(--primary)]"
                            aria-label={`Select ${product.name}`}
                          />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--muted-soft)] text-[11px] text-[var(--muted)]">
                              {product.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-[var(--foreground)]">
                                {product.name}
                              </p>
                              <p className="text-[11px] text-[var(--muted)]">
                                {product.category}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-[var(--foreground)]">
                          {views.toLocaleString('en-US')}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-[var(--foreground)]">
                          ${product.price.toFixed(3)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-[var(--foreground)]">
                          $
                          {revenue.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                          .00
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          {user?.role === 'Manager' ? (
                            <div className="inline-flex gap-1">
                              <Link
                                href={`/products/edit/${product.id}`}
                                className="rounded-[8px] border border-[var(--border)] px-3 py-1 text-[11px] font-medium text-[var(--muted)] hover:bg-[var(--muted-soft)] hover:text-[var(--foreground)]"
                              >
                                Edit
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleDelete(product.id)}
                                disabled={deletingId === product.id}
                                className="rounded-[8px] border border-[var(--border)] px-3 py-1 text-[11px] font-medium text-[var(--danger)] hover:bg-[var(--muted-soft)] disabled:opacity-60"
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            <span
                              className="cursor-not-allowed text-[var(--muted)]"
                              title="Manager only"
                            >
                              Manage
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                {!loading && !error && products.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center text-[var(--muted)]"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Static pagination strip to mirror Figma */}
          <footer className="flex items-center justify-between border-t border-[var(--border)] px-6 py-3 text-[11px] text-[var(--muted)]">
            <p>Showing 1–{products.length || 1} of {products.length || 1} results</p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-[var(--border)] text-[10px]"
              >
                1
              </button>
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-[6px] text-[10px] text-[var(--muted)]"
              >
                2
              </button>
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-[6px] text-[10px] text-[var(--muted)]"
              >
                3
              </button>
              <span className="px-1 text-[10px]">…</span>
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-[6px] text-[10px] text-[var(--muted)]"
              >
                5
              </button>
            </div>
          </footer>
        </article>

        {/* Right side stats card – Total Views */}
        <article className="app-page-card flex flex-col justify-between px-6 py-5">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                Total Views
              </p>
              <h2 className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                +112,893
              </h2>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
              +81%
            </span>
          </header>

          <div className="mt-6 flex flex-1 items-end gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full items-end justify-center gap-1 rounded-[8px] bg-[var(--muted-soft)] px-1.5 pb-1.5 pt-2">
                  <span
                    className="inline-block w-1 rounded-full bg-[#22c55e]"
                    style={{ height: `${18 + ((index * 7) % 30)}px` }}
                  />
                </div>
                <span className="text-[9px] text-[var(--muted)]">
                  {index % 2 === 0 ? 'Nov' : 'Dec'}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
