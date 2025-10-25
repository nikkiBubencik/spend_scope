import { useState } from "react";
import { Budget } from "@/utils/budgetStorage";
import styles from './BudgetItem.module.css';
import { useRouter } from "next/navigation";

interface Props {
  budget: Budget;
  eraseBudget: (id:number, name: string, category: string) => void;
}


const BudgetItem: React.FC<Props> = ({ budget, eraseBudget }) =>{
    const { id, name, description, limit, expenseCategory, endDate} = budget;
    const [seeDesc, setSeeDesc] = useState<boolean>(false);
    const router = useRouter();

    const toggleSeeDesc = () => {
        setSeeDesc(!seeDesc);
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
                <p>{expenseCategory}</p>
                <p>{endDate}</p>
            </div>
            <div className="itemInfo">
                <div>
                    {description &&
                        <>
                            {seeDesc && <p>{description}</p>}
                            <button className="button" onClick={toggleSeeDesc}>
                                {seeDesc ? 
                                    '▲ Hide Description' 
                                    : '▼ See Description'}
                            </button>
                        </>
                    }
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