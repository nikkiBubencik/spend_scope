import { useState, useEffect } from "react";
import { Transaction, getTransactions, saveTransaction, getNextID } from "../utils/transactionStorage";

export function useTransactions(){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const stored = getTransactions();
        setTransactions(stored);
    }, []);

    const addTransaction = (tx: Transaction) => {
        tx.id = getNextID();
        const updated = [...transactions, tx];
        setTransactions(updated);
        saveTransaction(updated);
    };
    
    const updateTransaction = (tx: Transaction) => {
        const updated = transactions.map(transaction =>
            transaction.id === tx.id ? tx : transaction
        );
        setTransactions(updated);
        saveTransaction(updated);
    };

    const deleteTransaction = (id: number) => {
        const updated = transactions.filter(tx => tx.id !== id);
        setTransactions(updated);
        saveTransaction(updated);
    };

    return {
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction
    }
}