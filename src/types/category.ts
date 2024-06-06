import { Product } from ".";

// Définissez une interface pour représenter une catégorie
export interface Category {
    id: string; // L'ID du document Firestore
    name: string;
    slug: string; // Le nom de la catégorie
    products: Product[]; 
    createdAt: any;
    updatedAt: any;

}

export interface CategoryForm {
    name: string;
    slug: string; // Le nom de la catégorie
}
