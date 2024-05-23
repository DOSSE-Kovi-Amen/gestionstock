import { Category } from "./category";
import { Client } from "./client";

export interface Sale {
    id: string;
    client: Client;
    amountPaid: number;
    discount: number;
    subTotal: number;
    totalAmount: number;
    debt:number;
    change: number;
    saleDetails: string;
    authorId: string;
    created_at: any;
    updated_at: any;
}

export interface SaleForm {
    clientId: string;
    amountPaid: number|any;
    discount: number|any;
    subTotal: number;
    totalAmount: number;
    debt:number;
    change: number;
    saleDetails: SaleDetails[]|any;
}

export interface SaleDetails {
    id: string; // Identifiant unique du produit
    name: string; // Nom du produit
    description: string; // Description du produit
    purchase_price: number; // Prix d'achat du produit
    selling_price: number; // Prix de vente du produit
    stock: number; // Stock disponible
    quantity:number;
    category_id: string; // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
    image_url: string; // URL de l'image du produit
}