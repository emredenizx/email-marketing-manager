import React, { useContext, useState } from 'react'
import { Icon } from 'semantic-ui-react'
import { Companies } from '../../context/companies'
import styles from './Sort.module.scss'

const Sort = ({ column }) => {

    const { setSorting, params } = useContext(Companies);
    const { orderBy } = params.sort;

    const [isDesc, setDirection] = useState(true)

    const onSelect = () => {
        const params = {
            orderBy: column,
            direction: !isDesc ? 'desc' : 'asc'
        }
        setDirection(!isDesc)
        setSorting(params);
    }

    return (
        <div className={styles.sortButtons}>
            <button className={styles.container} onClick={onSelect}>
                <div className={styles.icons}>
                    {column !== orderBy &&
                        <>
                            <Icon name='caret up' className={styles.icon} />
                            <Icon name='caret down' className={styles.icon} />
                        </>
                    }
                    {column === orderBy && !isDesc && <Icon name='caret up' className={styles.icon} />}
                    {column === orderBy && isDesc && <Icon name='caret down' className={styles.icon} />}
                </div>
            </button>
        </div>
    );
}

export default Sort