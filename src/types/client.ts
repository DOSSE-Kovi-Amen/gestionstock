// Définissez une interface pour représenter une catégorie
export interface Client {
    id: string;
    code_cli: string;
    name: string;
    email?: string; // Email est nullable
    telephone: string;
    address: string;
    description: string;
    organization_id?: string; 
    created_at: any;
    updated_at: any;

}

export interface ClientForm {
    name: string;
    email?: string; // Email est nullable
    telephone: string;
    address: string;
    description: string;
}
