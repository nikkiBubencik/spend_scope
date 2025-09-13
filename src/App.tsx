import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import AddTransaction from './components/Transactions/AddTransaction/AddTransaction';
import TransactionList from './components/Transactions/TransactionList/TransactionList';
import { useTransactions } from './hooks/useTransactions';
import AddBudget from './components/Budget/AddBudget/AddBudget';

function App() {
  const {transactions, addTransaction, deleteTransaction } = useTransactions();

  return (
    <div className="App">
      <Header />
      {/* <AddTransaction/>
      <TransactionList transactions={transactions}/> */}
      <AddBudget />
    </div>
  );
}

export default App;
