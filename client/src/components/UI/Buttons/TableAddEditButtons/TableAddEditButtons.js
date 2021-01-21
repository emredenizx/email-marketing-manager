import React from 'react';
import { Button, Popup, Grid, Header } from 'semantic-ui-react'

const TableAddEditButtons = ({ onEdit, onRemove }) => {
    return (
        <>
            <Button
                circular
                basic
                size='mini'
                icon='edit'
                onClick={onEdit}
            />
            <Popup size='tiny'
                trigger={<Button
                    circular
                    size='mini'
                    basic
                    icon='delete'
                />}
                pinned
                on="click"
                position="right center"
            >
                <Grid centered divided columns={1}>
                    <Grid.Column textAlign="center">
                        <Header as="h4">Confirm Delete?</Header>
                        <Button
                            color='black'
                            size='tiny'
                            onClick={onRemove}
                        >OK
                        </Button>
                    </Grid.Column>
                </Grid>
            </Popup>
        </>
    );
}

export default TableAddEditButtons