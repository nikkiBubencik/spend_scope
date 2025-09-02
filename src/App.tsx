import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import AddTransaction from './components/Transactions/AddTransaction';
import TransactionList from './components/Transactions/TransactionList';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const {transactions, addTransaction, deleteTransaction } = useTransactions();

  return (
    <div className="App">
      <Header />
      {/* <AddTransaction/> */}
      <TransactionList transactions={transactions}/>
    </div>
  );
}

export default App;
