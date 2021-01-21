import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styles from './PrimaryButton.module.scss'

const PrimaryButton = ({ label, icon, onClick, loading, disabled }) => {
    return (
        <div className={styles.primaryButton}>
            <Button
                primary
                floated='right'
                loading={loading}
                disabled={disabled}
                icon
                labelPosition='left'
                size='small'
                onClick={onClick}
            >
                <Icon name={icon} /> {label}
            </Button>
        </div>
    );
}

export default PrimaryButton;