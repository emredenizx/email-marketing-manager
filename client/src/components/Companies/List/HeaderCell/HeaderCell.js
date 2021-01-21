import React from 'react';
import { Table } from 'semantic-ui-react'

const HeaderCell = ({ children, isHidden = false, ...rest }) => {
    return (
        <>
            {
                !isHidden &&
                <Table.HeaderCell
                    {...rest}
                >
                    {children}
                </Table.HeaderCell >
            }
        </>
    );
}

export default HeaderCell;