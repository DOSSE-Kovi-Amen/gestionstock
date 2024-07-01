import { type Product } from ".";

// Définissez une interface pour représenter une catégorie
export interface Category {
    id: string; // L'ID du document Firestore
    name: string;
    slug: string; // Le nom de la catégorie
    created_at: any;
    updated_at: any;
    parent: Category;
    children: Category[];
    parent_id: string;
    products_count:number;

}

export interface CategoryForm {
    name: string;
    slug: string; // Le nom de la catégorie
    parent_id: string;
}
