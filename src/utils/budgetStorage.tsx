export const STORAGE_KEY = 'budgets';

export interface Budget {
    id: number;
    name: string;
    description: string;
    limit: number;
    expenseCategory: string;
    endDate?: string;
}

//get Budget
export function getBudgets(): Budget[]{
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data).budgets : [];
}

//save Budget
export function saveBudget(budgets: Budget[]): void{
    let data = JSON.parse(window.localStorage.getItem(STORAGE_KEY) as string);
    // update budgets of budgets in localstorage 
    data.budgets = budgets;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// get nextID value and update value for nextID
export function getNextID(): number{
    const data = window.localStorage.getItem(STORAGE_KEY);
    let nextId: number;
    let budget;
    if(data){
        budget = JSON.parse(data);
        nextId = budget.nextId;
        budget.nextId = nextId+1;
    }
    else{
        nextId = 1;
        budget = {nextId: nextId + 1, budgets: []};
    }
    // update localstorage with new nextId value
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(budget));
    return nextId;
}
