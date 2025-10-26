'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Budget as BudgetInterface } from "@/types/Budget";
import { useBudget } from '@/hooks/useBudget';
import './AddBudget.module.css';
import { useExpense } from "@/hooks/useExpense";
import { useRouter } from 'next/navigation';

interface props {
    id?: number;
}

function AddBudget({ id }: props){
    const [edit, setEdit] = useState<boolean>(false);
    const [newBudget, setNewBudget] = useState<BudgetInterface>({
            'id' : 0,
            'name': '',
            'description': '',
            'expenseCategory': '',
            'limit': 0,
            'startDate': '',
            'endDate': '',
            'frequency': 'weekly'
        });    
    const { budgets, addBudget, updateBudget } = useBudget();
    const { categories } = useExpense();
    const router = useRouter();
    
    useEffect(() => {
        if (id && budgets.length > 0) {
            const budget:BudgetInterface = budgets.filter(budget => budget.id == id)[0];
            if (budget) {
                setNewBudget(budget);
                setEdit(true);
            }
        }
    }, [id, budgets]);

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setNewBudget((prev: BudgetInterface) => {
            return {
                ...prev,
                [name]: name === "limit" ? parseFloat(value) || 0 : value,
            };
        });
        
    }

    function cancelBudget() {
        console.log("Budget Cancelled");
        router.back();
    }

    function SubmitBudget(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // ensure all expenses have a specified category
        if(newBudget.expenseCategory === ''){
            alert('Please enter an Expense Category');
            return;
        }
        console.log("Adding Budget...", newBudget);
        if(edit) updateBudget(newBudget);
        else addBudget(newBudget);
        router.push("/budgets");
    }

    return (
        <div className="componentGroup">
            <h2>{edit ? "Edit" : "Add"} Budget</h2>
            <form onSubmit={SubmitBudget}>
                <label htmlFor="name">Name:</label>
                <br/>
                <input
                    type="text"
                    name="name"
                    className="textInput"
                    value={newBudget.name}
                    onChange={handleChange}
                    placeholder="Enter Budget Name"
                    required
                />
                <br/>
                <label htmlFor="description">Description:</label>
                <br/>
                <textarea
                    name="description"
                    className="textInput"
                    value={newBudget.description}
                    onChange={handleChange}
                    placeholder="Enter a description of the Budget"
                />
                <br/>
                <label htmlFor="limit">Limit: </label>
                <div className="amountInput">
                    <span className="prefix">$</span>
                    <input
                        type="number"
                        name="limit"
                        value={newBudget.limit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <label htmlFor="expenseCategory">Budget Category:</label>
                <br/>
                <select
                    name="expenseCategory"
                    value={newBudget.expenseCategory}
                    onChange={handleChange}
                    required
                >
                    <option>Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <br/>
                <label htmlFor="frequency">Frequency:</label>
                <br/>
                <select
                    name="frequency"
                    value={newBudget.frequency}
                    onChange={handleChange}
                    required
                >
                    <option value="weekly">
                        Weekly
                    </option>
                    <option value="monthly">
                            Monthly
                    </option>
                </select>
                <br/>
                <label htmlFor="startDate">Scheduled Start Date:</label>
                <br/>
                <input
                    type="date"
                    name="startDate"
                    value={newBudget.startDate}
                    onChange={handleChange}
                    required
                />
                <br/>
                <label htmlFor="endDate">End Date(Optional):</label>
                <br/>
                <input
                    type="date"
                    name="endDate"
                    value={newBudget.endDate}
                    onChange={handleChange}
                />
                <br/>
                <br/>
                <div className="buttonContainer">
                    <button type="submit" className="submit-button">Save</button>
                    <button type="button" className="cancel-button" onClick={cancelBudget}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddBudget;