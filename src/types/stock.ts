import type { Product } from ".";
import type { Supplier } from "./supplier";

// Interface pour StockProduct
interface StockProduct {
    id: string;
    stock_id: string;
    product_id: string;
    product:Product;
    quantity: number;
    purchase_price: number;
    total_price: number;
    created_at: any;
    updated_at: any;
}

// Interface pour Stock
export interface Stock {
    id: string;
    supplier_id: string;
    date: string;
    total_amount: number;
    organization_id: string | null;
    created_at: any;
    updated_at: any;
    supplier: Supplier;
    stock_products: StockProduct[];
}



export interface StockForm {
    supplier_id: string;
    date:any;
    products: StockDetails[]|any;
}

export interface StockDetails {
    id: string; // Identifiant unique du produit
    name: string; // Nom du produit
    description: string; // Description du produit
    stock: number; // Stock disponible
    quantity:number;
    category_id: string; // Catégorie du produit (par exemple, "Électronique", "Vêtements", etc.)
    image: string; // URL de l'image du produit
}