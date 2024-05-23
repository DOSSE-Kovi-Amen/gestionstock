// Définissez une interface pour représenter une catégorie
export interface Supplier {
    id: string; // L'ID du document Firestore
    codeSupplier: string; //
    name: string;
    email: string;
    telephone:string;
    zip_code:string;
    address:string;
    description:string;
    country:string;
    city:string;
    created_at: any;
    updated_at: any;

}

export interface SupplierForm {
    codeSupplier: string; //
    name: string;
    email: string;
    telephone:string;
    zip_code:string;
    address:string;
    description:string;
    country:string;
    city:string;
}
