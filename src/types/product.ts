// product.ts

import type { Category } from ".";


export interface Product {
  id: string; // Identifiant unique du produit
  name: string; // Nom du produit
  description: string; // Description du produit
  purchase_price: number; // Prix d'achat du produit
  selling_price: number; // Prix de vente du produit
  category_id: string; // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
  stock: number; // Stock disponible
  reorder_level: number; // Stock disponible
  category: Category; // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
  image: string; // URL de l'image du produit
  images: any; // URL de l'image du produit
  created_at: any;
  updated_at: any;
}

// product.ts

export interface ProductForm {
  name: string; // Nom du produit
  description: string; // Description du produit
  purchase_price: number|any; // Prix d'achat du produit
  selling_price: number|any; // Prix de vente du produit
  stock: number|any;  // Stock disponible
  reorder_level: number|any; // Stock disponible
  category_id: string; // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
  image: string|null; // URL de l'image du produit
  images: string|null; // URL de l'image du produit
  // Vous pouvez ajouter d'autres propriétés pertinentes pour votre application
}
