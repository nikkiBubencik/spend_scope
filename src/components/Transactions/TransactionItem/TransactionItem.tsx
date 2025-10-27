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
        <div className={`itemCard ${transactionType}`}>
            <div className="itemInfo">
                <h3><span className="important">{name}</span></h3>
                <p className="important">{transactionType === 'income' ? '+' : '-'}
                    {amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </p>

            </div>
            <div className="itemInfo">
                <p className={`${styles.transactionType} ${styles[transactionType]}`}>
                    {transactionType} 
                    {transactionType === 'expense' &&  ` - ${expenseCategory}`}
                </p>
                <p>{date}</p>
            </div>
            <div className={`itemInfo btnDiv`}>
                <div>
                    {description ?
                        <>
                            {seeDesc && <p>{description}</p>}
                            <button className="button" onClick={toggleSeeDesc}>
                                {seeDesc ? 
                                    '▲ Hide Description' 
                                    : '▼ See Description'}
                            </button>
                        </>
                        : <p></p>
                    } 
                </div>
                <div>
                    <button className="editBtn" onClick={editTransasction}></button>
                    <button className="deleteBtn" onClick={() => eraseTransaction(id, name, date)}></button>
                </div>
            </div>
        </div>
    );
}

export default TransactionItem;