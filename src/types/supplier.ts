// Définissez une interface pour représenter une catégorie
export interface Supplier {
    id: string; // L'ID du document Firestore
    codeSupplier: string; //
    name: string;
    email: string;
    telephone:string;
    zipCode:string;
    address:string;
    description:string;
    country:string;
    city:string;
    createdAt: any;
    updatedAt: any;

}

export interface SupplierForm {
    codeSupplier: string; //
    name: string;
    email: string;
    telephone:string;
    zipCode:string;
    address:string;
    description:string;
    country:string;
    city:string;
}
