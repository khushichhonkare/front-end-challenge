// src/app/(main)/products/edit/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { productService } from '@/services/productService';
import { Product } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  // Redirect if not manager
  if (user?.role !== 'Manager') {
    router.push('/products');
    return null;
  }

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await productService.getProductById(id as string);
          if (fetchedProduct) {
            setProduct(fetchedProduct);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (updatedFields: Omit<Product, 'id'>) => {
    if (!product) return;

    setIsSubmitting(true);
    try {
      const updatedProduct: Product = { ...product, ...updatedFields };
      await productService.updateProduct(updatedProduct);
      router.push('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/products');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-700 dark:text-gray-300">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
            Store / Product
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
            Edit Product
          </h1>
        </div>
      </header>

      <section className="app-page-card grid gap-8 px-6 py-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.1fr)]">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-[var(--foreground)]">
              {product.name}
            </h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Update the product details and pricing.
            </p>
          </div>

          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Right column – reuse same visual placeholders as Add page */}
        <aside className="space-y-6">
          <div className="space-y-3 rounded-[14px] border border-[var(--border)] bg-[var(--muted-soft)]/60 px-5 py-6">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              Previews Product
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Design placeholder for primary product preview.
            </p>
            <div className="flex min-h-[180px] flex-col items-center justify-center rounded-[12px] border border-dashed border-[var(--border)] bg-[var(--card)]/40 text-center text-xs text-[var(--muted)]">
              <span className="mb-1 text-2xl">🖼️</span>
              <p className="font-medium">Drag and drop your image here</p>
            </div>
          </div>

          <div className="space-y-3 rounded-[14px] border border-[var(--border)] bg-[var(--muted-soft)]/60 px-5 py-6">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              Thumbnail Product
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Design placeholder for product thumbnail.
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
