'use client';
import { Budget } from "@/types/Budget";
import BudgetItem from "@/components/Budget/BudgetItem/BudgetItem";
import styles from './BudgetList.module.css';
import { useBudget } from "@/hooks/useBudget";
import Link from "next/link";

interface Props {
  budgets: Budget[];
}

const BudgetList: React.FC<Props> =() =>{
    const {budgets, deleteBudget} = useBudget();

    const eraseBudget = (id: number, name: string, category: string) =>{
        if(window.confirm("You are about to delete " + name + "(" + category + ")")){
            deleteBudget(id);
        }
    }

    return (
        <div className={`componentGroup styles.budgetContainer`}>
            <h2>Your Budgets</h2>
            { budgets.length > 0 ?
                budgets.map((budget, index) => 
                    <BudgetItem budget={budget} eraseBudget={eraseBudget} key={index}/>
                )
                :
                <>
                    <p>No budgets to display</p>
                    <Link href="/budget-form">Add a budget</Link>
                </>
            }
        </div>
    );
}

export default BudgetList;