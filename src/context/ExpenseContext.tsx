import React, { createContext, useContext } from "react";
import { useExpense } from "@/hooks/useExpense";

const ExpenseContext = createContext<ReturnType<typeof useExpense> | null>(null);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const expense = useExpense();
  return (
    <ExpenseContext.Provider value={expense}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpenseContext must be used inside ExpenseProvider");
  return ctx;
}
