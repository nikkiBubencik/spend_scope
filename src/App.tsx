import React from 'react';
import './App.css';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const {transactions, addTransaction, deleteTransaction } = useTransactions();

  return (
    <div className="App">
      {/* <AddTransaction/> */}
      <TransactionList transactions={transactions}/>
    </div>
  );
}

export default App;
