// src/app/(main)/products/add/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { productService } from '@/services/productService';
import { Product } from '@/types';
import { useAuth } from '@/hooks/useAuth';

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  // Redirect if not manager
  if (user?.role !== 'Manager') {
    router.push('/products');
    return null;
  }

  const handleSubmit = async (newProduct: Omit<Product, 'id'>) => {
    setIsSubmitting(true);
    try {
      await productService.addProduct(newProduct);
      router.push('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/products');
  };

  return (
    <div className="space-y-5">
      {/* Page header – matches Add Product Figma */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
            Store / Product
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
            Add Product
          </h1>
        </div>
      </header>

      {/* Main layout: form + preview side column */}
      <section className="app-page-card grid gap-8 px-6 py-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.1fr)]">
        {/* Left – form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-[var(--foreground)]">
              Add New Product
            </h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Enter product details and pricing information.
            </p>
          </div>

          <ProductForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Right – preview & thumbnail placeholders */}
        <aside className="space-y-6">
          <div className="space-y-3 rounded-[14px] border border-[var(--border)] bg-[var(--muted-soft)]/60 px-5 py-6">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              Previews Product
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Drag and drop your main product image here.
            </p>
            <div className="flex min-h-[180px] flex-col items-center justify-center rounded-[12px] border border-dashed border-[var(--border)] bg-[var(--card)]/40 text-center text-xs text-[var(--muted)]">
              <span className="mb-1 text-2xl">🖼️</span>
              <p className="font-medium">Drag and drop your image here</p>
              <p className="mt-1 text-[11px]">
                PNG, JPG up to 5MB — design only, no upload required
              </p>
            </div>
          </div>

          <div className="space-y-3 rounded-[14px] border border-[var(--border)] bg-[var(--muted-soft)]/60 px-5 py-6">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              Thumbnail Product
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Smaller thumbnail used in product lists.
            </p>
            <div className="flex min-h-[140px] flex-col items-center justify-center rounded-[12px] border border-dashed border-[var(--border)] bg-[var(--card)]/40 text-center text-xs text-[var(--muted)]">
              <span className="mb-1 text-xl">⬚</span>
              <p className="font-medium">Drag and drop your image here</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
