import React, { useContext } from 'react'
import { Checker } from '../../UI/FormInput/FormInput'
import { TableColumns } from '../../../context/table.columns'
import styles from './Columns.module.scss'

const Columns = () => {

    const { columns, setColumnSelection } = useContext(TableColumns)

    const onChange = (event, name, checked) => setColumnSelection(name, checked);

    return (
        <div className={styles.columnsFilter}>
            {columns.map(column =>
                <Checker    
                    key={column.name}
                    label={column.label}
                    name={column.name}
                    value={column.value}
                    disabled={false}
                    onChange={onChange}
                />
            )}
        </div>
    );
}

export default Columns