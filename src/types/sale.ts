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
    saleDetails: SaleDetails[];
    authorId: string;
    createdAt: any;
    updatedAt: any;
}

export interface SaleForm {
    client: Client|any;
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
    category: Category|any; // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
    imageUrl: string; // URL de l'image du produit
}