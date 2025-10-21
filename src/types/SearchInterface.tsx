import { Transaction } from "@/types/Transaction";

type TransactionType = 'income' | 'expense' | '';

export interface SearchInterface {
    filter: keyof Transaction,
    value: string,
    endValue: string,
    transactionType: TransactionType,
    expenseCategory: string
}