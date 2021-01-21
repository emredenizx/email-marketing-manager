import React from 'react'
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import { MOCK_CONTEXT, MOCK_COMPANIES_DATA } from './mock'

import { Companies } from "../../../context/companies";
import { TableColumns } from "../../../context/table.columns";
import { Modal } from "../../../context/modal";

import List from './List'

let container;

function getByTestId(element, testId) {
    return element?.querySelector(`[data-testid='${testId}']`);
}

function renderer(value, container) {
    render(
        <Companies.Provider value={value}>
            <TableColumns.Provider value={value}>
                <Modal.Provider value={value}>
                    <List />
                </Modal.Provider>
            </TableColumns.Provider>
        </Companies.Provider>
        , container);
}

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("should render companies", () => {
    act(() => {
        renderer(MOCK_CONTEXT, container);
    });

    const table = container.querySelector(`[data-testid='tableBody']`);
    const rows = table.getElementsByTagName('tr');
    const pagination = container.querySelector('.pagination').innerHTML;

    const firstCompany = MOCK_COMPANIES_DATA.companies[0]
    expect(rows.length).toBe(MOCK_COMPANIES_DATA.companies.length);
    expect(getByTestId(table, 'companyName')?.textContent).toEqual(firstCompany.name)
    expect(getByTestId(table, 'companyEmail')?.textContent).toEqual(firstCompany.email)
    expect(pagination).toBeTruthy();
});

test('should hide pagination when companies filter data count is less than 10', () => {
    act(() => {
        renderer({
            ...MOCK_CONTEXT,
            data: {
                ...MOCK_CONTEXT.data,
                filterCount: 9
            }
        }, container);
    });

    const pagination = container.querySelector('.pagination').innerHTML;
    expect(pagination).toBeFalsy();
})
