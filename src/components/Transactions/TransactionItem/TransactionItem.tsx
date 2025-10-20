import { useState } from "react";
import { Transaction } from "@/types/Transaction";
import styles from './TransactionItem.module.css';
// import { useNavigate } from "react-router-dom";
import { useTransactions } from "../../../hooks/useTransactions";
import { useRouter } from 'next/navigation';

interface Props {
  transaction: Transaction;
  eraseTransaction: (id:number, name: string, date: string) => void;
}


const TransactionItem: React.FC<Props> = ({ transaction, eraseTransaction }) =>{
    const { id, name, description, amount, transactionType, expenseCategory, date} = transaction;
    const [seeDesc, setSeeDesc] = useState<boolean>(false);
    const { deleteTransaction } = useTransactions();
    const router = useRouter();

    const toggleSeeDesc = () => {
        setSeeDesc(!seeDesc);
    }

    // const navigate = useNavigate();
    function editTransasction(){
        console.log(id);
        router.push(`/transaction-form/${id}`);
    }

    return (
        <div className={`${styles.transactionCard} ${styles[transactionType]}`}>
            <div className={styles.transactionInfo}>
                <h3><span className={styles.important}>{name}</span></h3>
                <p className={styles.important}>{transactionType === 'income' ? '+' : '-'}
                    {amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </p>

            </div>
            <div className={styles.transactionInfo}>
                <p className={`${styles.transactionType} ${styles[transactionType]}`}>
                    {transactionType} 
                    {transactionType === 'expense' &&  ` - ${expenseCategory}`}
                </p>
                <p>{date}</p>
            </div>
            {/* {description && <p>{description}</p>} */}
            <div className={`${styles.transactionInfo} ${styles.btnDiv}`}>
                <div>
                    {description ?
                        <>
                            {seeDesc && <p>{description}</p>}
                            <button className={styles.button} onClick={toggleSeeDesc}>
                                {seeDesc ? 
                                    '▲ Hide Description' 
                                    : '▼ See Description'}
                            </button>
                        </>
                        : <p></p>
                    } 
                </div>
                <div>
                    <button id={styles.editBtn} onClick={editTransasction}></button>
                    <button id={styles.deleteBtn} onClick={() => eraseTransaction(id, name, date)}></button>
                </div>
            </div>
        </div>
    );
}

export default TransactionItem;