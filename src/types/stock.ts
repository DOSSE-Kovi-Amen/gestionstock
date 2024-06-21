import { Category } from "./category";
import { Supplier } from "./supplier";

export interface Stock {
    id: string;
    supplier: Supplier;
    stockDetails: string;
    totalNewStock: number;
    created_at: any;
    updated_at: any;
}
export interface StockForm {
    supplierId: string;
    totalNewStock: number;
    stockDetails: StockDetails[]|any;
}

export interface StockDetails {
    id: string; // Identifiant unique du produit
    name: string; // Nom du produit
    description: string; // Description du produit
    stock: number; // Stock disponible
    quantity:number;
    category_id: string; // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
    image_url: string; // URL de l'image du produit
}