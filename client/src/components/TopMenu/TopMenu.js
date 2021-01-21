import React from 'react'
import AddCompany from "../Companies/AddCompany";
import Settings from '../Settings';
import styles from './TopMenu.module.scss'

const TopMenu = () => {
    return (
        <>
            <div className={`top-menu ${styles.container}`}>
                <div className={styles.item}> <Settings /></div>
                <div className={styles.item}> <AddCompany /></div>
            </div>
        </>
    );
}

export default TopMenu;