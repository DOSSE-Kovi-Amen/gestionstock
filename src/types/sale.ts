export interface Sale{
    id: string;
    reference: string;
    client: string;
    amountPaid: number;
    discount: number;
    subTotal: number;
    totalAmount: number;
    balance: number;
    saleDetails: SaleDetail[];
    authorId: string;
    note:string;
    createdAt: any;
    updatedAt: any;
}

export interface SaleDetail{
    productId: string;
    productName: string;
    productImageUrl: string;
    quantity: number;
    purchase_price: number; // Prix d'achat du produit
    selling_price: number; // Prix de vente du produit    
}