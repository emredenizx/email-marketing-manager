import React from "react";
import { InputText } from '../../UI/FormInput/FormInput'

const ModalContentGenerator = ({ fields, onChange, state, onKeyDown }) => {
    return (
        fields.map((field, index) =>
            <InputText
                key={index}
                label={field.label}
                name={field.name}
                value={state[field.name]}
                disabled={field.disabled}
                onChange={onChange}
                onKeyDown={onKeyDown} />
        ));
}

export default ModalContentGenerator;