import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar(){
    return (
        <nav aria-label='sidebar navigation'>
            <section>
                <h2>Transactions</h2>
                <span className={styles.subsection}><Link to="/" className={styles.link}>Add Transaction</Link></span>
                <span className={styles.subsection}><Link to="/transactions" className={styles.link}>Transaction History</Link></span>
                
            </section>
        </nav>
    )
}

export default Sidebar;