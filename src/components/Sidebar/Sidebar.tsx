import styles from './Sidebar.module.css';
import Link from 'next/link';

function Sidebar(){
    return (
        <nav aria-label='sidebar navigation'>
            <section>
                <h2>Transactions</h2>
                <span className={styles.subsection}><Link href="/transaction-form" className={styles.link}>Add Transaction</Link></span>
                <span className={styles.subsection}><Link href="/transactions" className={styles.link}>Transaction History</Link></span>
            </section>
        </nav>
    )
}

export default Sidebar;