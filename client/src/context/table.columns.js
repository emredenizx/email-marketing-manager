import React, { createContext, useState } from "react";

const options = [
    { label: "City/Town", name: "citytown", value: true },
    { label: "County", name: "county", value: true },
    { label: "Last Event", name: "event_name", value: true },
    { label: "Event Type", name: "event_type", value: false },
    { label: "Processed At", name: "event_processed_at", value: false },
    { label: "Global Unsubscribes", name: "has_unsubscribed", value: false },

];

export const TableColumns = createContext();

export const TableColumnsProvider = ({ children }) => {

    const [columns, setColumns] = useState(options)

    const setColumnSelection = (selection, value) => {
        const options = columns.reduce((options, option) => {
            if (option.name === selection) {
                const selected = {
                    ...option,
                    value: value
                };
                return [...options, selected];
            }
            return [...options, option];
        }, []);

        setColumns(options);
    }

    const resetColumns = () => { }

    return (
        <TableColumns.Provider value={{
            columns: columns,
            setColumnSelection,
            resetColumns
        }}
        >
            {children}
        </TableColumns.Provider>
    );
};
