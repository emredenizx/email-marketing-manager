import React, { useContext, useState } from 'react'
import { InputText } from '../UI/FormInput'
import { Companies } from '../../context/companies';
import SecondaryButton from "../UI/Buttons/SecondaryButton";
import styles from './Search.module.scss'

const init = {
    name: '',
    email: ''
}

const Search = () => {

    const [fields, setField] = useState(init)

    const { name, email } = fields;
    const { setSearch, resetSearch } = useContext(Companies)

    const onChange = (event) => {
        const { name, value } = event.target
        setField(state => ({
            ...state,
            [name]: value
        }))
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') onApply()
    }

    const onApply = () => {
        if (name || email) {
            const data = {
                name: name.trim(),
                email: email.trim()
            }
            setSearch(data);
        }
    }

    const onClear = () => {
        setField(init);
        resetSearch();
    }

    return (
        <>
            <div className={styles.search}>
                <div className={styles.items}>
                    <InputText
                        label='Name'
                        name='name'
                        value={name}
                        onChange={onChange}
                        onKeyDown={onKeyDown} />
                    <InputText
                        label='Email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        onKeyDown={onKeyDown} />
                </div>
            </div>
            <div className={styles.buttons}>
                <SecondaryButton
                    label='Reset'
                    icon='delete'
                    onClick={onClear}
                />
                <SecondaryButton
                    label='Search'
                    icon='search'
                    color='blue'
                    onClick={onApply}
                />
            </div>
        </>
    );
}

export default Search;