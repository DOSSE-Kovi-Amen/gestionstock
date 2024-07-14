import  type{ Category } from "./category";
import  type{ Client } from "./client";
import  type{ Product } from "./product";

interface SaleProduct{
    id: string;
    sale_id: string;
    product_id: string;
    product:Product;
    quantity: number;
    unit_price: number;
    created_at: string;
    updated_at: string;
}

export interface Sale {
    id: string;
    client_id: string;
    amount_paid: number;
    discount: number;
    sub_total: number;
    payment_status: string;
    debt_payments:DebtPayment[];
    tax_amount: number;
    total_amount: number;
    debt: number;
    change: number;
    organization_id: string | null;
    created_at: string;
    updated_at: string;
    client: Client;
    invoice_number: number;
    sale_products: SaleProduct[];
}
export interface DebtPayment {
    sale_id: number; // ou string selon la structure de vos IDs
    amount_paid: number;
    payment_date: string; // ou Date selon votre usage
    organization_id: number; // ou string selon la structure de vos IDs
    created_at:string
  }
  
export interface SaleForm {
    client_id: string;
    amount_paid: number|any;
    discount: number|any;
    subTotal: number;
    total_amount: number;
    debt:number;
    change: number;
    products: SaleDetails[]|any;
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
    image: string; // URL de l'image du produit
}