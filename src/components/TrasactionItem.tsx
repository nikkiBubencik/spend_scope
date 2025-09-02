import { useState } from "react";
import { Transaction } from "../utils/transactionStorage";
import './transaction.css';

interface Props {
  transaction: Transaction;
}

// TODO 
// show amount with 2 decimal places
// color each transaction based on income or isExpressionStatement

const TransactionItem: React.FC<Props> = ({ transaction }) =>{
    const { name, description, amount, transactionType, expenseCategory, date} = transaction;
    const [seeDesc, setSeeDesc] = useState<boolean>(false);

    const toggleSeeDesc = () => {
        setSeeDesc(!seeDesc);
    }

    return (
        <div className={`transaction-card ${transactionType}`}>
            <div className="transaction-info">
                <>
                    <h3>{name}</h3>
                    <p>{date}</p>
                </>
                <p>${amount.toFixed(2)}</p>
                <>
                    <p>{transactionType} </p>
                    {transactionType === 'expense' &&  <p>{expenseCategory}</p>}
                </>
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

export default TransactionItem;