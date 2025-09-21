import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import AddTransaction from './components/Transactions/AddTransaction/AddTransaction';
import TransactionList from './components/Transactions/TransactionList/TransactionList';
import { useTransactions } from './hooks/useTransactions';
import { useBudget } from './hooks/useBudget';
import AddBudget from './components/Budget/AddBudget/AddBudget';
import BudgetList from './components/Budget/BudgetList/BudgetList';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import { useState } from 'react';

function App() {
  const {transactions, addTransaction, deleteTransaction } = useTransactions();
  const {budgets, addBudget, deleteBudget } = useBudget();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  function toggleSidebar(){
    setShowSidebar(!showSidebar);
  }

  return (
    <div className="App">
      
      <Header toggleSidebar={toggleSidebar}/>
      <div className="mainLayout">
        {showSidebar && 
          <aside id="Sidebar">
            <Sidebar/>
          </aside>
        }
        <main>
          <Routes>
            <Route path="/" element={<AddTransaction />} />
            <Route path="/transactions" element={<TransactionList transactions={transactions}/>} />
            <Route path="/transaction/:id" element={<AddTransaction />} />
            {/* <Route path="/budgets" element={<Contact />} /> */}
          </Routes>
        </main>
      </div>
      {/* <AddTransaction/>
      <TransactionList transactions={transactions}/> */}
      {/* <AddBudget />
      <BudgetList budgets={budgets}/> */}
    </div>
  );
}

export default App;
