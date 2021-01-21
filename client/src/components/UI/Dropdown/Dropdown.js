import React from 'react'
import { Dropdown as DropdownMenu } from 'semantic-ui-react'
import AddEditButtonWithPopup from "../Buttons/AddEditButtonWithPopup";
import styles from './Dropdown.module.scss'

const Dropdown = ({ label, name, options, value, onChange, addEditButtons, onAddEdit, disabled, isLoading }) => {

    const getOptionId = (value, options) => {
        let key = '';
        if (value) {
            key = options.find(item => item.value === value).key || ''
        }
        return key;
    }

    return (
        <>
            <div className={styles.location}>
                <div className={styles.title}>{label}</div>
                <div className={styles.wrapper}>
                    <div className={styles.dropdown}>
                        <DropdownMenu
                            loading={isLoading}
                            disabled={disabled}
                            options={options || []}
                            placeholder='Select'
                            clearable
                            search
                            selection
                            fluid
                            value={value}
                            name={name}
                            onChange={(e, { value, options }) => {
                                const id = getOptionId(value, options)
                                onChange(value, id)
                            }}
                        />
                    </div>
                    {
                        addEditButtons &&
                        <div className={styles.buttonsWrapper}>
                            <AddEditButtonWithPopup
                                type='add'
                                typeLabel='Add'
                                fieldName={name}
                                fieldLabel={label}
                                onClick={onAddEdit}
                            />
                            <AddEditButtonWithPopup
                                type='edit'
                                typeLabel='Edit'
                                fieldName={name}
                                fieldLabel={label}
                                onClick={onAddEdit}
                            />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Dropdown;
