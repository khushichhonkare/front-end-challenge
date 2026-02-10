// src/components/ProductForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';

interface ProductFormProps {
  initialData?: Product; // For editing existing products
  onSubmit: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [price, setPrice] = useState(initialData?.price.toString() || '');
  const [stock, setStock] = useState(initialData?.stock.toString() || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setPrice(initialData.price.toString());
      setStock(initialData.stock.toString());
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Product name is required.';
    if (!category) newErrors.category = 'Category is required.';
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      newErrors.price = 'Price must be a positive number.';
    }
    if (!stock || isNaN(parseInt(stock)) || parseInt(stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative integer.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* General information section */}
      <section className="space-y-4">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            General Information
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-[10px] border border-[var(--border)] bg-[var(--muted-soft)] px-3 text-sm text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:bg-[var(--card)]"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-[var(--danger)]">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]"
            >
              Product Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 w-full rounded-[10px] border border-[var(--border)] bg-[var(--muted-soft)] px-3 text-sm text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:bg-[var(--card)]"
              disabled={isSubmitting}
            />
            {errors.category && (
              <p className="mt-1 text-xs text-[var(--danger)]">
                {errors.category}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="space-y-4">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Pricing
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-10 w-full rounded-[10px] border border-[var(--border)] bg-[var(--muted-soft)] px-3 text-sm text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:bg-[var(--card)]"
              disabled={isSubmitting}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-[var(--danger)]">{errors.price}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="stock"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="h-10 w-full rounded-[10px] border border-[var(--border)] bg-[var(--muted-soft)] px-3 text-sm text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:bg-[var(--card)]"
              disabled={isSubmitting}
            />
            {errors.stock && (
              <p className="mt-1 text-xs text-[var(--danger)]">{errors.stock}</p>
            )}
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3 border-t border-[var(--border)] pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-[10px] border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--danger)] hover:bg-[var(--muted-soft)] disabled:opacity-60"
          disabled={isSubmitting}
        >
          Discard Change
        </button>
        <button
          type="submit"
          className="rounded-[10px] bg-[var(--primary)] px-5 py-2 text-xs font-medium text-[var(--primary-foreground)] shadow-sm hover:bg-[var(--primary-hover)] disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
