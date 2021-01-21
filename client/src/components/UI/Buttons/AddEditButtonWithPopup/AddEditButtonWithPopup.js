import React from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import styles from './AddEditButtonWithPopup.module.scss'

const icons = {
    add: 'plus',
    edit: 'edit'
}

const AddEditButtonWithPopup = ({ type, typeLabel, fieldLabel, fieldName, onClick }) => {

    const popupLabel = `${typeLabel} ${fieldLabel}`

    return (
        <div className={styles.buttonWithPopup}>
            <Popup
                inverted
                size='mini'
                trigger={
                    <Button
                        icon
                        size='mini'
                        compact
                        name={fieldName}
                        onClick={(event, { name }) => {
                            onClick(type, name, fieldLabel)
                        }}
                    >
                        <Icon name={`${icons[type]}`} />
                    </Button>
                }
                content={popupLabel}
                on='hover'
            />
        </div>
    )
}

export default AddEditButtonWithPopup;