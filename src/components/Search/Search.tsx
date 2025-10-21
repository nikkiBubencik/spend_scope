import { Transaction } from "@/types/Transaction";
import { useState } from 'react';
import { SearchInterface } from '@/types/SearchInterface';
import { useExpense } from "@/hooks/useExpense";

interface props {
    searchList: (searchCriteria: SearchInterface) => void;
}


export default function Search ( { searchList }: props){
    const [searchCriteria, setSearchCriteria] = useState<SearchInterface>(
        {
            filter: 'name',
            value: '',
            endValue: '',
            transactionType: '',
            expenseCategory: ''
        });
    const { categories } = useExpense();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
        const name = e.target.name as keyof SearchInterface;
        const val:string = e.target.value;
        let newVal: string;
        let newEndVal: string;
        if(name === "filter"){
            newVal = "";
            newEndVal = "";
        }
        else if(name === "value"){
            newVal = val;
            newEndVal = searchCriteria.endValue;
        }
        else if(name == "endValue"){
            newVal = searchCriteria.value;
            newEndVal = val;
        }
        else{
            newVal = searchCriteria.value;
            newEndVal = searchCriteria.endValue;
        }
        const category = name === "transactionType" && val !== "expense" ? "" : searchCriteria.expenseCategory;
        setSearchCriteria( prev => ({...prev, ["endValue"]: newEndVal, ["value"]: newVal, ["expenseCategory"]: category, [name]: val}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchList(searchCriteria);
    }

    return (
        <div style={{textAlign:"center"}}>
            <h2 style={{margin:".15rem"}}>
                Search
            </h2>
            <form onSubmit={handleSubmit}
                style={{display:'flex', flexDirection:"column", alignItems:'center', justifyContent:'stretch'}}>
            {(searchCriteria.filter === "name" || searchCriteria.filter === "description") && 
                <input
                    style={{width:'100%'}}
                    type="text"
                    name="value"
                    value={searchCriteria.value}
                    onChange={handleChange}
                    />
            }
            {
                searchCriteria.filter === "amount" &&
                <div>
                    $
                    <input
                        type="number"
                        name="value"
                        value={searchCriteria.value}
                        onChange={handleChange}
                        min={0}
                        />
                    <span style={{fontWeight:"600", fontSize:"1.5rem"}}>-</span>$
                    <input
                        type="number"
                        name="endValue"
                        value={searchCriteria.endValue}
                        onChange={handleChange}
                        />
                </div>
            }
            {
                searchCriteria.filter === "date" &&
                <div>
                    <input
                    type="date"
                    name="value"
                    value={searchCriteria.value}
                    onChange={handleChange}
                    />
                    to
                    <input
                    type="date"
                    name="endValue"
                    value={searchCriteria.endValue}
                    onChange={handleChange}
                    />
                </div>
            }
                <div>
                    <input 
                        type="radio"
                        id="name"
                        name="filter"
                        value="name"
                        checked={searchCriteria.filter==="name"}
                        onChange={handleChange}
                    />
                    <label htmlFor='name'>Name</label>
                    <input 
                        type="radio"
                        id="description"
                        name="filter"
                        value="description"
                        checked={searchCriteria.filter==="description"}
                        onChange={handleChange}
                    />
                    <label htmlFor='description'>Description</label>
                    <input 
                        type="radio"
                        id="amount"
                        name="filter"
                        value="amount"
                        checked={searchCriteria.filter ==="amount"}
                        onChange={handleChange}
                    />
                    <label htmlFor='amount'>Amount</label>
                    <input 
                        type="radio"
                        id="date"
                        name="filter"
                        value="date"
                        checked={searchCriteria.filter ==="date"}
                        onChange={handleChange}
                    />
                    <label htmlFor='date'>Dates</label>
                </div>
                <fieldset style={{width:"fit-content", maxWidth:"100%"}}> 
                    <legend>Transaction Type</legend>
                    <input
                        type="radio"
                        name="transactionType"
                        value=""
                        checked={searchCriteria.transactionType === ""}
                        onChange={handleChange}
                    />
                    <label>
                        All types
                    </label>
                    <input
                        type="radio"
                        name="transactionType"
                        value="income"
                        checked={searchCriteria.transactionType === "income"}
                        onChange={handleChange}
                    />
                    <label>
                        Income
                    </label>
                    
                    <input
                        type="radio"
                        name="transactionType"
                        value="expense"
                        checked={searchCriteria.transactionType === "expense"}
                        onChange={handleChange}
                    />
                    <label>
                        Expense
                    </label>
                    { searchCriteria.transactionType === "expense" &&
                        <>
                            <br/>
                            <label htmlFor="expenseCategory">Expense Category:</label>
                            <select
                                name="expenseCategory"
                                // value={searchCriteria.expenseCategory}
                                onChange={handleChange}
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}