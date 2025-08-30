import { useState, useEffect } from "react";
import { Transaction, getTransactions, saveTransaction } from "../utils/transactionStorage";

export function useTransactions(){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const stored = getTransactions();
        setTransactions(stored);
    }, []);

    const addTransaction = (tx: Transaction) => {
        const updated = [...transactions, tx];
        setTransactions(updated);
        saveTransaction(updated);
    };

    const deleteTransaction = (id: string) => {
        const updated = transactions.filter(tx => tx.id !== id);
        setTransactions(updated);
        saveTransaction(updated);
    };

    return {
        transactions,
        addTransaction,
        deleteTransaction
    }
}