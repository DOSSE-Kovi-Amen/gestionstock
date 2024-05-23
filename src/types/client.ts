// Définissez une interface pour représenter une catégorie
export interface Client {
    id: string; // L'ID du document Firestore
    code_cli: string; //
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

export interface ClientForm {
    code_cli: string; //
    name: string;
    email: string|null;
    telephone:string;
    zip_code:string;
    address:string;
    description:string;
    country:string;
    city:string;
}
