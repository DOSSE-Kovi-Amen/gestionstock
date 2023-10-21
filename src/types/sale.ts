import { Client } from "./client";
import { Product } from "./product";

export interface Sale {
    id: string;
    reference: string;
    client: Client;
    amountPaid: number;
    discount: number;
    subTotal: number;
    totalAmount: number;
    debt:number;
    change: number;
    products: Product[];
    authorId: string;
    note: string;
    createdAt: any;
    updatedAt: any;
}

export interface SaleForm {
    reference: string;
    client: Client;
    amountPaid: number;
    discount: number;
    subTotal: number;
    totalAmount: number;
    debt:number;
    change: number;
    products: Product[] | null;
    authorId: string;
    note: string;
}