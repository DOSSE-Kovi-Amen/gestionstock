// Définissez une interface pour représenter une catégorie
export interface Category {
    id: string; // L'ID du document Firestore
    name: string;
    slug: string; // Le nom de la catégorie
    createdAt: any;
    updatedAt: any;

}

export interface CategoryForm {
    name: string;
    slug: string; // Le nom de la catégorie
}
