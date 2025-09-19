import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import AddTransaction from './components/Transactions/AddTransaction/AddTransaction';
import TransactionList from './components/Transactions/TransactionList/TransactionList';
import { useTransactions } from './hooks/useTransactions';
import { useBudget } from './hooks/useBudget';
import AddBudget from './components/Budget/AddBudget/AddBudget';
import BudgetList from './components/Budget/BudgetList/BudgetList';

function App() {
  const {transactions, addTransaction, deleteTransaction } = useTransactions();
  const {budgets, addBudget, deleteBudget } = useBudget();

  return (
    <div className="App">
      <Header />
      <AddTransaction/>
      <TransactionList transactions={transactions}/>
      <AddBudget />
      <BudgetList budgets={budgets}/>
    </div>
  );
}

export default App;
