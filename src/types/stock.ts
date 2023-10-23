import { Category } from "./category";
import { Supplier } from "./supplier";

export interface Stock {
    id: string;
    supplier: Supplier;
    stockDetails: StockDetails[];
    totalNewStock: number;
    authorId: string;
    createdAt: any;
    updatedAt: any;
}

export interface StockForm {
    supplier: Supplier|any;
    totalNewStock: number;
    stockDetails: StockDetails[]|any;
}

export interface StockDetails {
    id: string; // Identifiant unique du produit
    name: string; // Nom du produit
    description: string; // Description du produit
    stock: number; // Stock disponible
    quantity:number;
    category: Category|any; // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
    imageUrl: string; // URL de l'image du produit
}