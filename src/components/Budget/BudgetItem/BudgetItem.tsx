import { useState } from "react";
import { Budget } from "../../../utils/budgetStorage";
import styles from './BudgetItem.module.css';

interface Props {
  budget: Budget;
}


const BudgetItem: React.FC<Props> = ({ budget }) =>{
    const { name, description, limit, expenseCategory, endDate} = budget;
    const [seeDesc, setSeeDesc] = useState<boolean>(false);

    const toggleSeeDesc = () => {
        setSeeDesc(!seeDesc);
    }

    return (
        <div className={styles.budgetCard}>
            <div className={styles.budgetInfo}>
                
                <h3>{name}</h3>
                <p>{endDate}</p>
            
                <p>${limit.toFixed(2)}</p>
                <p>{expenseCategory}</p>
            </div>
            {description &&
                <>
                    {seeDesc && <p>{description}</p>}
                    <button onClick={toggleSeeDesc}>
                        {seeDesc ? 
                            'Hide Description' 
                            : 'See Description'}
                    </button>
                </>
            }
        </div>
    );
}

export default BudgetItem;