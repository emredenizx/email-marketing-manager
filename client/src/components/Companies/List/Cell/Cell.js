import React from 'react';
import { Table } from 'semantic-ui-react'

const Cell = ({ data, isHidden = false, ...rest }) => {
    return (
        <>
            {
                !isHidden &&
                <Table.Cell
                    {...rest}
                >
                    {data}
                </Table.Cell >
            }
        </>
    );
}

export default Cell;