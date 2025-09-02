import TransactionItem from "./TrasactionItem";
import { Transaction } from "../utils/transactionStorage";
import './transaction.css';

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> =({transactions}) =>{

    return (
        <div className="tranaction-container">
            {transactions.map((transaction, index) => 
                <TransactionItem transaction={transaction} key={index}/>
            )}
        </div>
    );
}

export default TransactionList;