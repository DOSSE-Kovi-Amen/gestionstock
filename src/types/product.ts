// product.ts

export interface Product {
  id: string; // Identifiant unique du produit
  name: string; // Nom du produit
  description: string; // Description du produit
  price: number; // Prix du produit
  stock: number; // Stock disponible
  category: string; // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
  imageUrl: string; // URL de l'image du produit
  createdAt: any;
  updatedAt: any;
}

// product.ts

export interface ProductForm {
  name: string; // Nom du produit
  description: string; // Description du produit
  price: number|any; // Prix du produit
  stock: number|any; // Stock disponible
  category: string; // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
  imageUrl: string; // URL de l'image du produit
  // Vous pouvez ajouter d'autres propriétés pertinentes pour votre application
}
