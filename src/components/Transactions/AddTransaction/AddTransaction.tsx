import { useState, ChangeEvent, FormEvent } from "react";
import {Transaction as TransactionInterface} from '../../../utils/transactionStorage'
import { useTransactions } from '../../../hooks/useTransactions';
import styles from './AddTransaction.module.css';

function AddTransaction(){
    const [newTransaction, setNewTransaction] = useState<TransactionInterface>({
            'id' : 'id',
            'transactionType': 'income',
            'name': '',
            'description': '',
            'expenseCategory': '',
            'amount': 0,
            'date': Date()
        });    
    const { addTransaction } = useTransactions();

    // TODO: will make expense catgeory a list saved in local storage
    const categories = ["Grocery", "Housing", "Transportation", "Subscriptions", "Entertainment", "Other"];

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
        addTransaction(newTransaction);
    }

    return (
        <div className={styles.addTransactionContainer}>
            <h2>Add Transaction</h2>
            <form onSubmit={SubmitTransaction}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={newTransaction.name}
                    onChange={handleChange}
                    placeholder="Enter transaction name"
                    required
                />
                <br/>
                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    value={newTransaction.description}
                    onChange={handleChange}
                    placeholder="Enter a description of the transaction"
                />
                <br/>
                <label htmlFor="amount">Amount: $</label>
                <input
                    type="number"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleChange}
                    required
                />
                <br/>
                <label htmlFor="date">Date:</label>
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
                    <button type="submit" className="submit-button">Add Transaction</button>
                    <button type="button" className="cancel-button" onClick={cancelTransaction}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTransaction;