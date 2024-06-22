import { Product } from "./product";

export interface Loss {
    id:string;
    product:Product;
    quantity:number;
    purchase_price:number;
    description: string;
    created_at: any;
    updated_at: any;

}
export interface LossForm{
    product_id:string;
    quantity:number|null;
    description: string;
}