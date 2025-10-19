'use client';
import TransactionItem from "@/components/Transactions/TransactionItem/TransactionItem";
import { Transaction } from "@/utils/transactionStorage";
import styles from './TransactionList.module.css';
import { useTransactions } from "@/hooks/useTransactions";
import Link from "next/link";
import { useEffect, useState } from "react";
import Search from "@/components/Search/Search";
import { SearchInterface } from '@/types/SearchInterface';

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> =() =>{
    const { transactions, deleteTransaction } = useTransactions();
    const [accumulatedTotal, setAccumulatedTotal] = useState<number>(0);
    const [showTransactions, setShowTransactions] = useState<Transaction[]>(transactions);

    useEffect(() => {
        const total = transactions.reduce((acc, transaction) => transaction.transactionType == 'income' ? acc + transaction.amount : acc - transaction.amount, 0);
        setAccumulatedTotal(total);
        setShowTransactions(transactions)
    }, [transactions]);

    useEffect(() =>{
        setAccumulatedTotal(showTransactions.reduce((acc, transaction) => transaction.transactionType == 'income' ? acc + transaction.amount : acc - transaction.amount, 0));
    }, [showTransactions])

    const searchTransactions = (searchCriteria: SearchInterface) => {
        const { filter, value }: SearchInterface = searchCriteria;
        // alert(filter + " " + value);
        if (value == '') setShowTransactions(transactions);
        else {
            setShowTransactions(
                transactions.filter(transaction => {
                    const field = transaction[filter];
                    // alert("transaction.name " + transaction.name.includes(value) );
                    // console.log(typeof(transaction.name) + " |" + transaction.name + "| " + typeof(value) + " |" + value + "|");
                    if(typeof(field) === "string"){
                        return field?.toLowerCase().includes(value.toLowerCase());
                    }
                }
                )
            )
        }
    }

    const eraseTransaction = (id: number, name: string, date: string) =>{
        if(window.confirm("You are about to delete " + name + " from " + date)){
            deleteTransaction(id);
        }
    }

    return (
        <div className={`componentGroup styles.tranactionContainer`}>
            {transactions.length > 0 ?
            <>
                <h1>Your Transactions</h1>
                <Search searchList={searchTransactions} />
                <p>
                    <span style={{fontWeight: 600}}>Total: </span> 
                    {accumulatedTotal.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </p>
                {showTransactions.map((transaction, index) => 
                    <TransactionItem transaction={transaction} eraseTransaction={eraseTransaction} key={transaction.id}/>
                ) }
            </>
            : 
                <>
                    <p>No Transactions to display</p>
                    <Link href="/transaction-form">Add a transaction</Link>
                </>
            }
        </div>
    );
}

export default TransactionList;