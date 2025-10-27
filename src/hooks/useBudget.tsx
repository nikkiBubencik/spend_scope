import { useState, useEffect } from "react";
import { getBudgets, saveBudget, getNextID } from "../utils/budgetStorage";
import { Budget, freqType } from "@/types/Budget";
import { useTransactions } from "./useTransactions";
import { Transaction} from "@/types/Transaction";

export function useBudget(){
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const { transactions } = useTransactions();

    useEffect(() => {
        const stored = getBudgets();
        setBudgets(stored);
    }, []);

    const addBudget = (bt: Budget) => {
        bt.id = getNextID();
        // determine startOn
        const start = parseLocalDate(bt.startDate);
        if(bt.frequency === 'weekly'){
            bt.startsOn = start.getDay();
        }
        else {
            bt.startsOn = start.getDate();
        }
        const updated = [...budgets, bt];
        setBudgets(updated);
        saveBudget(updated);
    };

    const deleteBudget = (id: number) => {
        const updated = budgets.filter(tx => tx.id !== id);
        setBudgets(updated);
        saveBudget(updated);
    };

    const updateBudget = (bt: Budget) => {
        const updated = budgets.map(budget =>
            budget.id === bt.id ? bt : budget
        );
        setBudgets(updated);
        saveBudget(updated);
    };

    function isValidDate(year: number, month: number, day: number): boolean {
        const date = new Date(year, month, day);
        return date.getMonth() === month;
    }

    // string to date adjusts for time zones
    function parseLocalDate(isoDateStr: string): Date {
        const [year, month, day] = isoDateStr.split('-').map(Number);
        return new Date(year, month - 1, day); // local midnight
    }

    const determineAlignment = (id: number) => {
        // find budget
        const budget = budgets.find(bt => bt.id === id);
        if(budget && transactions.length > 0){
            const freq: freqType = budget.frequency;
            const start: number = budget.startsOn;
            const today: Date = new Date();
            let alignedTransactions: Transaction[];
            let currentStartDate: Date;

            if(freq === 'weekly'){
                //find budgets from start of previous week til today
                const today_dow: number = today.getDay();
                const diff = (today.getDay() - start + 7) % 7;
                currentStartDate = today;
                currentStartDate.setDate(today.getDate() - diff);
            }
            else{ // freq = monthly
                const todayDate: number = today.getDate();
                let budgetStartMonth: number = today.getMonth();
                let budgetStartYear: number = today.getFullYear();
                //determine if start month is for current or previous month
                if(todayDate < start){
                    budgetStartMonth--;
                    if(budgetStartMonth < 0){
                        budgetStartMonth = 11;
                        budgetStartYear--;
                    }
                }
                if(isValidDate(budgetStartYear, budgetStartMonth, start)){
                    currentStartDate = new Date(budgetStartYear, budgetStartMonth, start);
                }
                else{ // for dates like Feb 30 that don't exist
                    let nextMonth = budgetStartMonth + 1;
                    let nextYear = budgetStartYear;
                    if (nextMonth > 11) {
                        nextMonth = 0;
                        nextYear += 1;
                    }
                    currentStartDate = new Date(nextYear, nextMonth, 1);
                }
            }
            currentStartDate.setTime(0);
            alignedTransactions = transactions.filter((tx: Transaction) => {
                const txDate = parseLocalDate(tx.date);
                return (
                    budget.expenseCategory === tx.expenseCategory
                    && parseLocalDate(budget.startDate) <= txDate
                    && txDate >= currentStartDate
                )})
            return alignedTransactions.reduce((acc, val) => acc + val.amount, 0);
        }
        else return 0;
    }

    return {
        budgets,
        addBudget,
        deleteBudget,
        updateBudget,
        determineAlignment
    }
}