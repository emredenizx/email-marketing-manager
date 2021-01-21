import React from 'react'
import { Checker } from '../../UI/FormInput'
import styles from './EmailFilters.module.scss'

const options = {
    global: [
        { label: "All", name: 'all', },
        { label: "Unsent", name: "unsent" },
        { label: "Global Unsubscribers", name: "has_unsubscribed" }
    ],
    activity: [
        { label: "Delivered", name: "delivered" },
        { label: "Open", name: "open" },
        { label: "Click", name: "click" },
        { label: "Bounce", name: "bounce" },
        { label: "Drop", name: "drop" },
        { label: "Unsubscribe", name: "unsubscribe" }
    ]
}

const EmailActivityFilter = ({ setSelection, activitySelection, globalSelection }) => {

    const onActivityChange = (...props) => {
        const [, name] = props;
        setSelection({
            type: 'email_activitySelection',
            payload: name
        })
    }

    const onGlobalChange = (...props) => {
        const [, name] = props;
        setSelection({
            type: 'email_globalSelection',
            payload: name
        })
    }

    return (
        <div className={styles.container}>
            {options.activity.map(option =>
                <Checker
                    key={option.name}
                    label={option.label}
                    name={option.name}
                    value={activitySelection[option.name]}
                    disabled={false}
                    onChange={onActivityChange}
                />
            )}
            {options.global.map(option =>
                <Checker
                    key={option.name}
                    label={option.label}
                    name={option.name}
                    value={option.name === globalSelection}
                    disabled={false}
                    onChange={onGlobalChange}
                />
            )}
        </div>
    );
}

export default EmailActivityFilter;