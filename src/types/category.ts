import { Product } from ".";

// Définissez une interface pour représenter une catégorie
export interface Category {
    id: string; // L'ID du document Firestore
    name: string;
    slug: string; // Le nom de la catégorie
<<<<<<< HEAD
    created_at: any;
    updated_at: any;
    products_count:number;
=======
    products: Product[]; 
    createdAt: any;
    updatedAt: any;
>>>>>>> 9a50e1fcae1ed53abf740f8b499219423cef50a0

}

export interface CategoryForm {
    name: string;
    slug: string; // Le nom de la catégorie
}
