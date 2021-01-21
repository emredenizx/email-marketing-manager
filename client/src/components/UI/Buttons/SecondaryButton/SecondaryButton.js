import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styles from './SecondaryButton.module.scss'

const SecondaryButton = ({ label, icon, color, onClick, disabled, loading }) => {
    return (
        <div className={styles.secondaryButton}>
            <Button
                loading={loading}
                disabled={disabled}
                floated='right'
                icon
                labelPosition='left'
                size='mini'
                color={color}
                onClick={onClick}
            >
                <Icon name={icon} /> {label}
            </Button>
        </div>
    );
}

export default SecondaryButton;