// Définissez une interface pour représenter une catégorie
export interface Supplier {
    id: string; // L'ID du document Firestore
    code_supplier: string; //
    name: string;
    email: string;
    telephone:string;
    address:string;
    description:string;
    created_at: any;
    updated_at: any;

}

export interface SupplierForm {
    name: string;
    email: string;
    telephone:string;
    address:string;
    description:string;

}
