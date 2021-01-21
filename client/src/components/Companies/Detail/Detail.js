import React from 'react'
import styles from './Detail.module.scss'

const Detail = ({ company }) => {
    return (
        <div className={styles.detail}>
            {company && company.data.map((item, index) =>
                <div key={index} className={styles.row}>
                    <div className={styles.label}>{item.label}</div>
                    <div className={styles.data}>{item.data}</div>
                </div>)
            }
        </div>
    );
}

export default Detail;