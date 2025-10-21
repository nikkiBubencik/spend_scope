export const STORAGE_KEY = 'expenseCategories';

//get transaction
export function getExpenseCategories(): string[]{
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : ["Grocery", "Housing", "Transportation", "Entertainment"];
}

//save new category
export function saveExpenseCategory(categories: string[]): void{
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}


