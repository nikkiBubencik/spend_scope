import { useState } from "react";
import { Transaction } from "../../../utils/transactionStorage";
import styles from './TransactionItem.module.css';
import { useNavigate } from "react-router-dom";

interface Props {
  transaction: Transaction;
}


const TransactionItem: React.FC<Props> = ({ transaction }) =>{
    const { id, name, description, amount, transactionType, expenseCategory, date} = transaction;
    const [seeDesc, setSeeDesc] = useState<boolean>(false);

    const toggleSeeDesc = () => {
        setSeeDesc(!seeDesc);
    }

    const navigate = useNavigate();
    function editTransasction(){
        console.log(id);
        navigate(`/transaction/${id}`);
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
                {description ?
                    <>
                        {seeDesc && <p>{description}</p>}
                        <button onClick={toggleSeeDesc}>
                            {seeDesc ? 
                                '▲ Hide Description' 
                                : '▼ See Description'}
                        </button>
                    </>
                    : <p></p>
                } 
                <button id={styles.editBtn} onClick={editTransasction}></button>
            </div>
        </div>
    );
}

export default TransactionItem;