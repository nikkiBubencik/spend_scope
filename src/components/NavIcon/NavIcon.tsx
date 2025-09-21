import styles from './NavIcon.module.css';

interface NavIconProps {
  toggleSidebar: () => void; // function that takes no args, returns void
}

export default function NavIcon({ toggleSidebar }: NavIconProps){

    
    return (
        <div onClick={toggleSidebar} className={styles.container}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
        </div>)
}