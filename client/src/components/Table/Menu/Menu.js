import React from 'react';
import AccordionTab from '../../UI/AccordionTab'
import Filter from '../../Filter'
import Search from '../../Search'
import Columns from '../../Filter/Columns'
import ExportToCSV from '../../Companies/ExportToCSV'
import styles from './TableMenu.module.scss'

const Menu = () => {
    return (
        <div className={`table-menu ${styles.container}`}>
            <AccordionTab title='MENU'>
                <div className={styles.content}>
                    <div className={styles.header}>COLUMNS</div>
                    <Columns />
                </div>
                <div className={styles.content}>
                    <div className={styles.header}>SEARCH</div>
                    <Search />
                </div>
                <div className={styles.content}>
                    <div className={styles.header}>FILTERS</div>
                    <Filter />
                </div>
            </AccordionTab>
            <ExportToCSV />
        </div>
    );
}

export default Menu;