import { useState, ChangeEvent, FormEvent } from "react";
import { Budget as BudgetInterface } from "../../../utils/budgetStorage";
import { useBudget } from '../../../hooks/useBudget';
import './AddBudget.module.css';

function AddBudget(){
    const [newBudget, setNewBudget] = useState<BudgetInterface>({
            'id' : 0,
            'name': '',
            'description': '',
            'expenseCategory': '',
            'limit': 0,
            'endDate': ''
        });    
    const { addBudget } = useBudget();

    // TODO: will make expense catgeory a list saved in local storage
    const categories = ["Grocery", "Housing", "Transportation", "Subscriptions", "Entertainment", "Other"];

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
    }

    function SubmitBudget(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // ensure all expenses have a specified category
        if(newBudget.expenseCategory === ''){
            alert('Please enter an Expense Category');
            return;
        }
        console.log("Adding Budget...", newBudget);
        addBudget(newBudget);
    }

    return (
        <div>
            <h2>Add Budget</h2>
            <form onSubmit={SubmitBudget}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={newBudget.name}
                    onChange={handleChange}
                    placeholder="Enter Budget Name"
                    required
                />
                <br/>
                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    value={newBudget.description}
                    onChange={handleChange}
                    placeholder="Enter a description of the Budget"
                />
                <br/>
                <label htmlFor="limit">Limit: $</label>
                <input
                    type="number"
                    name="limit"
                    value={newBudget.limit}
                    onChange={handleChange}
                    required
                />
                <br/>
                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={newBudget.endDate}
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor="expenseCategory">Budget Category:</label>
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
                <br/>
                <div className="buttonContainer">
                    <button type="submit" className="submit-button">Add Budget</button>
                    <button type="button" className="cancel-button" onClick={cancelBudget}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddBudget;