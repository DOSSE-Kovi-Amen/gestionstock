export interface Loss {
    id:string;
    product:ProductDetail;
    quantity:number;
    description: string;
    createdAt: any;
    updatedAt: any;

}
export interface ProductDetail{
    id:string;
    name:string;
    purchase_price: number|any; // Prix d'achat du produit
}

export interface LossForm{
    product:ProductDetail;
    quantity:number|null;
    description: string;
}