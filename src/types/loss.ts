import { Product } from "./product";

export interface Loss {
    id:string;
    product:string;
    quantity:number;
    description: string;
    createdAt: any;
    updatedAt: any;

}
export interface LossForm{
    product:Product|null;
    quantity:number|null;
    description: string;
}