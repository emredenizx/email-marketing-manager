import React, { useContext, useEffect, useReducer } from 'react'
import Location from '../Location'
import EmailFilters from "./EmailFilters";
import { Companies } from '../../context/companies';
import { Location as LocationContext } from '../../context/location'
import styles from './Filter.module.scss'
import SecondaryButton from "../UI/Buttons/SecondaryButton";

const init = {
    email: {
        global: {
            selection: 'all'
        },
        activity: {
            delivered: false,
            open: false,
            click: false,
            bounce: false,
            drop: false,
            unsubscribe: false
        }
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'locationSelection':
            return {
                ...state,
                location: {
                    ...state.location,
                    ...action.payload
                }
            }
        case 'email_activitySelection':
            return {
                ...state,
                email: {
                    ...state.email,
                    activity: {
                        ...state.email.activity,
                        [action.payload]: !state.email.activity[action.payload]
                    },
                    global: {
                        ...state.email.global,
                        selection: null
                    },
                }
            }
        case 'email_globalSelection':
            return {
                ...state,
                email: {
                    ...state.email,
                    global: {
                        ...state.email.global,
                        selection: action.payload
                    },
                    activity: {
                        ...state.email.activity,
                        ...init.email.activity
                    }
                }
            }
        case 'reset':
            return {
                ...init
            }
        default:
            break;
    }
}

const Filter = () => {

    const [filters, setFilterAction] = useReducer(reducer, init)

    const { setPage, setFilters, resetFilters, params } = useContext(Companies)
    const { location, resetLocationSelection } = useContext(LocationContext)

    useEffect(() => {
        (() => {
            setFilterAction({
                type: 'locationSelection',
                payload: location.selections.filter
            })
        })();
    }, [location.selections.filter])

    useEffect(() => {
        if (!params.filters) {
            (() => {
                setFilterAction({
                    type: 'reset'
                })
            })();
        }
    }, [params.filters])

    const onApply = () => {

        let email_activity;

        if (filters.email.global.selection === 'all') {
            email_activity = null
        } else if (filters.email.global.selection) {
            email_activity = filters.email.global.selection
        } else {
            let selections = [];
            for (const [key, value] of Object.entries(filters.email.activity)) {
                if (value) {
                    selections.push(key)
                }
            }
            email_activity = selections
        }

        setFilters({
            email_activity,
            location: filters.location ? { ...filters.location } : null,
        });

        setPage(1);
    }

    const onReset = () => {
        resetLocationSelection('filter');
        resetFilters();
    }

    const handleChange = (filters) => {
        setFilterAction({
            ...filters
        })
    }

    return (
        <>
            <div className={styles.filters}>
                <div className={styles.items}>
                    <div className={styles.emailActivity}>
                        <div className={styles.filterTitle}>LAST EVENT</div>
                        <EmailFilters
                            setSelection={handleChange}
                            globalSelection={filters.email.global.selection}
                            activitySelection={filters.email.activity}
                        />
                    </div>
                    <div className={styles.location}>
                        <div className={styles.filterTitle}>LOCATION</div>
                        <Location
                            type='filter'
                            addEditButtons={false}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <SecondaryButton
                    label='Apply'
                    icon='filter'
                    color='blue'
                    onClick={onApply}
                />
                <SecondaryButton
                    label='Reset'
                    icon='delete'
                    onClick={onReset}
                />
            </div>
        </>
    );
}

export default Filter;