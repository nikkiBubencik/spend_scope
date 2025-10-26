import { useState } from "react";
import { Budget } from "@/types/Budget";
import styles from './BudgetItem.module.css';
import { useRouter } from "next/navigation";

interface Props {
  budget: Budget;
  eraseBudget: (id:number, name: string, category: string) => void;
}


const BudgetItem: React.FC<Props> = ({ budget, eraseBudget }) =>{
    const { id, name, description, limit, expenseCategory, endDate, frequency, startDate} = budget;
    const [seeMore, setSeeMore] = useState<boolean>(false);
    const router = useRouter();

    const toggleSeeMore = () => {
        setSeeMore(!seeMore);
    }

    const editBudget = () => {
        router.push(`/budget-form/${id}`);
    }

    return (
        <div className="itemCard">
            <div className="itemInfo">
                <h3>{name}</h3>
                <p className="important">
                    {limit.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </p>
            </div>
            <div className="itemInfo">
                <p>{expenseCategory} - {frequency}</p>
            </div>
            <div className="itemInfo">
                <div>
                    {seeMore &&
                        <>
                            <p><span className="semiImportant">Start Date:</span> {startDate}</p>
                            {endDate && <p><span className="semiImportant">End Date:</span> {endDate}</p>}
                            {description && <p><span className="semiImportant">Notes:</span> {description}</p>}
                        </>
                    }
                    <button className="button" onClick={toggleSeeMore}>
                        {seeMore ? 
                            '▲ See Less' 
                            : '▼ See More'}
                    </button>
                    
                </div>
                <div>
                    <button className="editBtn" onClick={editBudget}></button>
                    <button className="deleteBtn" onClick={() => eraseBudget(id, name, expenseCategory)}></button>
                </div>
            </div>
        </div>
    );
}

export default BudgetItem;