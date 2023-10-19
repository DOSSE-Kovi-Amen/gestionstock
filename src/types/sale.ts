import { Product } from "./product";

export interface Sale{
    id: string;
    reference: string;
    client: string;
    amountPaid: number;
    discount: number;
    subTotal: number;
    totalAmount: number;
    change: number;
    products: Product[];
    authorId: string;
    note:string;
    createdAt: any;
    updatedAt: any;
}

export interface SaleForm{
    reference: string;
    client: string;
    amountPaid: number;
    discount: number;
    subTotal: number;
    totalAmount: number;
    change: number;
    products: Product[]|null;
    authorId: string;
    note:string;
    createdAt: any;
    updatedAt: any;
}