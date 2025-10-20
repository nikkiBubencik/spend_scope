export interface Transaction {
    id: number;
    name: string;
    description: string;
    amount: number;
    transactionType: 'income' | 'expense';
    expenseCategory?: string;
    date: string;
}