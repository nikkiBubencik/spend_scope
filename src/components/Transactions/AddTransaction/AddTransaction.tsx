'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Transaction as TransactionInterface } from "@/types/Transaction";
import { useTransactions } from '@/hooks/useTransactions';
import { useRouter } from 'next/navigation';
// import styles from './AddTransaction.module.css';
import { useExpense } from "@/hooks/useExpense";

interface props {
    id?: number;
}

function AddTransaction({ id }: props){
    const [newTransaction, setNewTransaction] = useState<TransactionInterface>({
            'id' : 0,
            'transactionType': 'income',
            'name': '',
            'description': '',
            'expenseCategory': '',
            'amount': 0,
            'date': Date()
        });    
    const [edit, setEdit] = useState<boolean>(false);
    const { transactions, addTransaction, updateTransaction } = useTransactions();
    const router = useRouter();
    const { categories } = useExpense();

    useEffect(() => {
        // alert("Transactions" + transactions[0]?.id);
        if (id && transactions.length > 0) {
            const transaction:TransactionInterface = transactions.filter(transaction => transaction.id == id)[0];
            // alert(transaction);
            console.log(transaction);
            console.log(transactions);
            if (transaction) {
                setNewTransaction(transaction);
                setEdit(true);
            }
        }
    }, [id, transactions]);

    // TODO: will make expense catgeory a list saved in local storage
    // const categories = ["Grocery", "Housing", "Transportation", "Subscriptions", "Entertainment", "Other"];

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setNewTransaction((prev) => {
            if (name === "transactionType" && value === "income") {
            return {
                ...prev,
                [name]: value,
                expenseCategory: "", 
            };
            }

            return {
                ...prev,
                [name]: name === "amount" ? parseFloat(value) || 0 : value,
            };
        });
        
    }

    function cancelTransaction() {
        console.log("Transaction Cancelled");
        router.back();
    }

    function SubmitTransaction(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // ensure all expenses have a specified category
        if(newTransaction.transactionType === 'expense' && newTransaction.expenseCategory === ''){
            alert('Please enter an Expense Category');
            return;
        }
        console.log("Adding Transaction...", newTransaction);
        // TODO: Save transaction
        if(edit) updateTransaction(newTransaction);
        else addTransaction(newTransaction);

        router.push(`/transactions`);
    }

    return (
        <div className={`componentGroup styles.addTransactionContainer`}>
            <h2>{edit ? 'Edit' : 'Add'} Transaction</h2>
            <form onSubmit={SubmitTransaction}>
                <label htmlFor="name">Name:</label>
                <br/>
                <input
                    className="textInput"                    
                    type="text"
                    name="name"
                    value={newTransaction.name}
                    onChange={handleChange}
                    placeholder="Enter transaction name"
                    required
                />
                <br/>
                <label htmlFor="description">Description:</label>
                <br/>
                <textarea
                    className="textInput"    
                    name="description"
                    value={newTransaction.description}
                    onChange={handleChange}
                    placeholder="Enter a description of the transaction"
                />
                <br/>
                <label htmlFor="amount">Amount:</label>
                <br/>
                <div className="amountInput">
                    <span className="prefix">$</span>
                    <input
                        type="number"
                        name="amount"
                        value={newTransaction.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <label htmlFor="date">Date:</label>
                <br/>
                <input
                    type="Date"
                    name="date"
                    value={newTransaction.date}
                    onChange={handleChange}
                    required
                />
                <fieldset> 
                    <legend>Transaction Type</legend>
                    <input
                        type="radio"
                        name="transactionType"
                        value="income"
                        checked={newTransaction.transactionType === "income"}
                        onChange={handleChange}
                    />
                    <label>
                        Income
                    </label>
                    
                    <input
                        type="radio"
                        name="transactionType"
                        value="expense"
                        checked={newTransaction.transactionType === "expense"}
                        onChange={handleChange}
                    />
                    <label>
                        Expense
                    </label>
                    { newTransaction.transactionType === "expense" &&
                        <>
                            <br/>
                            <label htmlFor="expenseCategory">Expense Category:</label>
                            <select
                                name="expenseCategory"
                                value={newTransaction.expenseCategory}
                                onChange={handleChange}
                                required={newTransaction.transactionType === "expense"}
                                >
                                <option>Select a category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                    {category}
                                    </option>
                                ))}
                            </select>
                        </>}
                </fieldset>

                <div className="buttonContainer">
                    <button type="submit" className="submit-button">Save</button>
                    <button type="button" className="cancel-button" onClick={cancelTransaction}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTransaction;