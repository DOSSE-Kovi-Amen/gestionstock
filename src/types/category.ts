// Définissez une interface pour représenter une catégorie
export interface Category {
    id: string; // L'ID du document Firestore
    name: string;
    slug: string; // Le nom de la catégorie
    description: string; // La description de la catégorie (facultative)
    createdAt: string;
    updatedAt: string;

}

export interface CategoryForm {
    name: string;
    slug: string; // Le nom de la catégorie
    description: string; // La description de la catégorie (facultative)
    createdAt: string;
    updatedAt: string;
}
