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
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Add New Product
      </h1>
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
