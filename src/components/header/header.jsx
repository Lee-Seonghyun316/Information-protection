import React from 'react';
import styles from './header.module.css';


const Header = ({onLogout}) => (
    <header className={styles.header}>
        {onLogout && <button className={styles.logout} onClick={onLogout}>Logout</button>}
        <div className={styles.headerLine}></div>
        <h1 className={styles.title}>Information-Protection</h1>
    </header>
);

export default Header;