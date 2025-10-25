'use client';
import { Budget } from "@/utils/budgetStorage";
import BudgetItem from "@/components/Budget/BudgetItem/BudgetItem";
import styles from './BudgetList.module.css';
import { useBudget } from "@/hooks/useBudget";

interface Props {
  budgets: Budget[];
}

const BudgetList: React.FC<Props> =() =>{
    const {budgets} = useBudget();
    return (
        <div className={styles.budgetContainer}>
            <h2>Your Budgets</h2>
            {budgets.map((budget, index) => 
                <BudgetItem budget={budget} key={index}/>
            )}
        </div>
    );
}

export default BudgetList;