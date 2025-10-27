import { useExpenseContext } from "@/context/ExpenseContext";
import { useState, FormEvent } from "react";

interface props {
    closeAdd: () => void
}

const AddExpense: React.FC<props> =({ closeAdd }) =>{
    const [error, setError] = useState<boolean>(false);
    const [ newCategory, setNewCategory] = useState<string>('');
    const { addCategory } = useExpenseContext();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(addCategory(newCategory) == "error") setError(true);
        else closeAdd();
    }

    return(
        <div className="popup">
            <h2>Add a New Expense Category</h2>
            {error && <p style={{color:'red'}}>Category already exists</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Categoy Name:</label>
                <br/>
                <input
                    type="text"
                    name="category"
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
                    />
                <br/>
                <div className="buttonContainer">
                    <button type="submit">Save</button>
                    <button type="button" onClick={closeAdd}>Cancel</button>
                </div>
            </form>
        </div>
    )
};

export default AddExpense;