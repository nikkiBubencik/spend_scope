import { Transaction } from "@/types/Transaction";

export const STORAGE_KEY = 'transactions';

// export interface Transaction {
//     id: number;
//     name: string;
//     description: string;
//     amount: number;
//     transactionType: 'income' | 'expense';
//     expenseCategory?: string;
//     date: string;
// }

//get transaction
export function getTransactions(): Transaction[]{
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data)?.transactions : [];
}

//save transactions
export function saveTransaction(transactions: Transaction[]): void{
    let data = JSON.parse(window.localStorage.getItem(STORAGE_KEY) as string);
    data.transactions = transactions;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getNextID(): number{
    const data = window.localStorage.getItem(STORAGE_KEY);
    let nextId: number;
    let transaction;
    if(data){
        transaction = JSON.parse(data);
        nextId = transaction.nextId;
        transaction.nextId = nextId+1;
    }
    else{
        nextId = 1;
        transaction = {nextId: nextId + 1, transactions: []};
    }
    // update localstorage with new nextId value
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transaction));
    return nextId;
}
