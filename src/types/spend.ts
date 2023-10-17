export interface Spend {
    id:string;
    title: string;
    amount: number;
    description: string;
    createdAt: any;
    updatedAt: any;

}

export interface SpendForm{
    title: string;
    amount: number|any;
    description: string;
}