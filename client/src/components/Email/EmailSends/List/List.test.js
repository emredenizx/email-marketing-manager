import React from 'react'
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import List from './List'
import { getMockedHttp } from "../../../../utils/test";

jest.mock('axios');
let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should NOT render accordion tab when no email activity exists for company", async () => {
    getMockedHttp([]);
    await act(async () => {
        render(<List />, container);
    });

    const listElement = container.querySelector('.emailSendsList')
    expect(listElement.textContent).toEqual('No Activity exists for this company yet!')
});

