// src/services/productService.ts
import { Product } from '@/types';

let products: Product[] = [
  {
    id: 'p1',
    name: 'Iphone 12 Pro',
    category: 'Smartphone',
    price: 1140,
    stock: 100,
    description: 'Flagship smartphone with Pro camera system.',
    tagKeyword: 'Electronics',
    discount: 10,
    discountCategory: 'Holiday',
    views: 14000,
    revenue: 164_000,
  },
  {
    id: 'p2',
    name: 'Macbook Pro 2023',
    category: 'Laptop',
    price: 2140,
    stock: 80,
    description: 'High‑performance laptop for professionals.',
    tagKeyword: 'Electronics',
    discount: 15,
    discountCategory: 'Seasonal',
    views: 14000,
    revenue: 164_000,
  },
  {
    id: 'p3',
    name: 'Macbook Pro 2023',
    category: 'Laptop',
    price: 2140,
    stock: 80,
    description: 'Macbook variant mirroring the Figma rows.',
    tagKeyword: 'Electronics',
    discount: 15,
    discountCategory: 'Seasonal',
    views: 14000,
    revenue: 164_000,
  },
  {
    id: 'p4',
    name: 'Product Name Place Here',
    category: 'Accessories',
    price: 1000,
    stock: 160,
    description: 'Generic product used to mirror Figma table.',
    tagKeyword: 'General',
    discount: 5,
    discountCategory: 'Default',
    views: 14000,
    revenue: 164_000,
  },
  {
    id: 'p5',
    name: 'Product Name Place Here',
    category: 'Accessories',
    price: 1000,
    stock: 160,
    description: 'Generic product used to mirror Figma table.',
    tagKeyword: 'General',
    discount: 5,
    discountCategory: 'Default',
    views: 14000,
    revenue: 164_000,
  },
  {
    id: 'p6',
    name: 'Product Name Place Here',
    category: 'Accessories',
    price: 1000,
    stock: 160,
    description: 'Generic product used to mirror Figma table.',
    tagKeyword: 'General',
    discount: 5,
    discountCategory: 'Default',
    views: 14000,
    revenue: 164_000,
  },
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
