import { useExpense } from "@/hooks/useExpense";
import { useState, FormEvent } from "react";

interface props {
    cancelAdd: () => void
}

const AddExpense: React.FC<props> =({ cancelAdd }) =>{
    const [ newCategory, setNewCategory] = useState<string>('');
    const { addCategory } = useExpense();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addCategory(newCategory);
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Categoy Name:</label>
                <input
                    type="text"
                    name="category"
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
                    />
                <button type="submit">Save</button>
                <button onSubmit={cancelAdd}>Cancel</button>
            </form>
        </div>
    )
};

export default AddExpense;