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
  /** Optional long description used on the Add / Edit screens */
  description?: string;
  /** Optional free-form tag keyword string as in the Figma */
  tagKeyword?: string;
  /** Optional discount percentage (0–100) */
  discount?: number;
  /** Optional discount category label */
  discountCategory?: string;
  /** Optional analytics-style fields surfaced in the table / cards */
  views?: number;
  revenue?: number;
}