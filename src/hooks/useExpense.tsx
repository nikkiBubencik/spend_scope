import { useState, useEffect } from "react";
import { getExpenseCategories, saveExpenseCategory } from "@/utils/expenseStorage";

export function useExpense(){
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const stored = getExpenseCategories();
        setCategories(stored);
    }, []);

    const addCategory = (category: string) => {
        if(categories.includes(category)) return "error";
        const updated = [...categories, category];
        setCategories(updated);
        saveExpenseCategory(updated);
        return "added";
    };
    
    // need to update logic 
    // cam't delete if attached to a transaction
    const deleteCategory = (category: string) => {
        const updated = categories.filter(cat => cat !== category);
        setCategories(updated);
        saveExpenseCategory(updated);
    };

    return {
        categories,
        addCategory,
        deleteCategory
    }
}