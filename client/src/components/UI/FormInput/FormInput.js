import React from 'react'
import { Input, Checkbox } from 'semantic-ui-react'

export const InputText = ({ label, value, onChange, name, additionalClass, disabled, onKeyDown }) => {
    return (
        <div className='row'>
            <div className={`input-label ${additionalClass ? additionalClass : ""}`}>{label}</div>
            <div className='input'>
                <Input
                    onKeyDown={(event) => onKeyDown(event)}
                    disabled={disabled}
                    fluid
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export const Checker = ({ label, value, onChange, name, disabled }) => {
    return (
        <div className='row'>
            <div className='input-label'>{label}</div>
            <div className='input'>
                <Checkbox
                    disabled={disabled}
                    name={name}
                    checked={value}
                    onChange={(event, { name, checked }) => onChange(event, name, checked)}
                />
            </div>
        </div>
    );
}


