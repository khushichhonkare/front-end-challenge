// src/types/index.ts

export type Role = 'Manager' | 'Store Keeper';

export interface User {
  id: string;
  email: string;
  role: Role;
  token: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}