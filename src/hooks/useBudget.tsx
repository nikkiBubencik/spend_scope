import { useState, useEffect } from "react";
import { Budget, getBudgets, saveBudget, getNextID } from "../utils/budgetStorage";

export function useBudget(){
    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        const stored = getBudgets();
        setBudgets(stored);
    }, []);

    const addBudget = (tx: Budget) => {
        tx.id = getNextID();
        const updated = [...budgets, tx];
        setBudgets(updated);
        saveBudget(updated);
    };

    const deleteBudget = (id: number) => {
        const updated = budgets.filter(tx => tx.id !== id);
        setBudgets(updated);
        saveBudget(updated);
    };

    return {
        budgets,
        addBudget,
        deleteBudget
    }
}