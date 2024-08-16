// types/Inventory.ts
export interface InventoryItem {
    id: string;
    name: string;
    description: string | null;
    initial_stock: number;
    sold_quantity: number;
    lost_quantity: number;
    current_stock: number;
    reorder_level: number;
    category: string;
    organization: string | null;
}
