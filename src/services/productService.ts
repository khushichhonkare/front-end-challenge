// src/services/productService.ts
import { Product } from '@/types';

let products: Product[] = [
  { id: 'p1', name: 'Laptop', category: 'Electronics', price: 1200, stock: 50 },
  { id: 'p2', name: 'Mouse', category: 'Electronics', price: 25, stock: 200 },
  { id: 'p3', name: 'Keyboard', category: 'Electronics', price: 75, stock: 150 },
  { id: 'p4', name: 'Desk Chair', category: 'Furniture', price: 250, stock: 30 },
  { id: 'p5', name: 'Monitor', category: 'Electronics', price: 300, stock: 70 },
  { id: 'p6', name: 'Coffee Maker', category: 'Home Appliances', price: 100, stock: 80 },
];

export const productService = {
  getProducts: (): Promise<Product[]> => {
    return Promise.resolve(products);
  },

  getProductById: (id: string): Promise<Product | undefined> => {
    return Promise.resolve(products.find((p) => p.id === id));
  },

  addProduct: (newProduct: Omit<Product, 'id'>): Promise<Product> => {
    const id = `p${products.length + 1}`;
    const productWithId = { ...newProduct, id };
    products.push(productWithId);
    return Promise.resolve(productWithId);
  },

  updateProduct: (updatedProduct: Product): Promise<Product | undefined> => {
    const index = products.findIndex((p) => p.id === updatedProduct.id);
    if (index > -1) {
      products[index] = updatedProduct;
      return Promise.resolve(updatedProduct);
    }
    return Promise.resolve(undefined);
  },

  deleteProduct: (id: string): Promise<boolean> => {
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    return Promise.resolve(products.length < initialLength);
  }
};
