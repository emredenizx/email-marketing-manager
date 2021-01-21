import React, { useContext } from 'react';
import EmailActivityUpload from '../Email/EmailActivityUpload'
import UpdateUnsubscribes from "../Email/UpdateUnsubscribes";
import { Companies } from '../../context/companies'
import styles from './Settings.module.scss'

const Settings = () => {
    const { data } = useContext(Companies);
    const { totalCount } = data;

    return (
        <div className={styles.settings}>
            <div className={styles.stats}>{'Total Number of Companies'}<span className={styles.count}>{totalCount}</span></div>
            <div className={styles.api}>
                <EmailActivityUpload />
                <UpdateUnsubscribes />
            </div>
        </div>
    );
}

export default Settings;