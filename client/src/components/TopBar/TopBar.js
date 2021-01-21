import React, { useContext } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { Auth } from '../../context/auth';
import styles from './TopBar.module.scss'

const TopBar = () => {

    const { currentUser, logout } = useContext(Auth)
    const { first_name, last_name } = currentUser
    const welcome = first_name + ' ' + last_name;

    const onLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`top-bar ${styles.container}`}>
            <span className={styles.hi}>Hi, </span>
            <span className={styles.welcome}>{welcome} </span>
            <Button
                icon
                compact
                onClick={onLogout}>
                <Icon name='log out' />
            </Button>
        </div>
    );
}

export default TopBar;