import { Transaction } from "@/types/Transaction";
import { useState } from 'react';
import { SearchInterface } from '@/types/SearchInterface';

interface props {
    searchList: (searchCriteria: SearchInterface) => void;
}


export default function Search ( { searchList }: props){
    const [searchCriteria, setSearchCriteria] = useState<SearchInterface>(
        {
            filter: 'name',
            value: '',
            endValue: ''
        });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
        const name = e.target.name as keyof SearchInterface;
        setSearchCriteria( prev => ({...prev, [name]: e.target.value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchList(searchCriteria);
    }

    return (
        <div>
            <h2>Search</h2>
            <form onSubmit={handleSubmit}>
            {(searchCriteria.filter === "name" || searchCriteria.filter === "description") && 
                <input
                    type="text"
                    name="value"
                    value={searchCriteria.value}
                    onChange={handleChange}
                    />
            }
            {
                searchCriteria.filter === "amount" &&
                <>
                    $
                    <input
                    type="number"
                    name="value"
                    value={searchCriteria.value}
                    onChange={handleChange}
                    />
                    to
                    $
                    <input
                    type="number"
                    name="value2"
                    value={searchCriteria.value}
                    onChange={handleChange}
                    />
                </>
            }
                <br/>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}