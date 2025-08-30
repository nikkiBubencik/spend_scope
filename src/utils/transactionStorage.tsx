export const STORAGE_KEY = 'transactions';

export interface Transaction {
    id: string;
    name: string;
    description: string;
    amount: number;
    transactionType: 'income' | 'expense';
    expenseCategory?: string;
    date: string;
}

//get transaction
export function getTransactions(): Transaction[]{
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

//save transactions
export function saveTransaction(transactions: Transaction[]): void{
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}
