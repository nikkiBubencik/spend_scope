import { useState } from "react";
import { Transaction } from "../../../utils/transactionStorage";
import styles from './TransactionItem.module.css';

interface Props {
  transaction: Transaction;
}


const TransactionItem: React.FC<Props> = ({ transaction }) =>{
    const { name, description, amount, transactionType, expenseCategory, date} = transaction;
    const [seeDesc, setSeeDesc] = useState<boolean>(false);

    const toggleSeeDesc = () => {
        setSeeDesc(!seeDesc);
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
            {description &&
                <>
                    {seeDesc && <p>{description}</p>}
                    <button onClick={toggleSeeDesc}>
                        {seeDesc ? 
                            '▲ Hide Description' 
                            : '▼ See Description'}
                    </button>
                </>
            }
        </div>
    );
}

export default TransactionItem;