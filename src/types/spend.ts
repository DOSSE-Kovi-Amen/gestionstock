export interface Spend {
    id:string;
    title: string;
    amount: number;
    description: string;
    created_at: any;
    updated_at: any;

}

export interface SpendForm{
    title: string;
    amount: number|any;
    description: string;
}