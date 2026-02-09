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
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Edit Product: {product.name}
      </h1>
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
