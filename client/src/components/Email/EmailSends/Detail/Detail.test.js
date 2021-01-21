import React from 'react'
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import Detail from './Detail'
import { getMockedHttp } from "../../../../utils/test";
import { MOCK_DATA } from "./mock";

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

it("should render single send activity details", async () => {
    getMockedHttp(MOCK_DATA);
    await act(async () => {
        render(<Detail />, container);
    });
    const items = container.querySelectorAll('.header')
    const firstItem = container.querySelector('.eventName')
    expect(items.length).toBe(MOCK_DATA.length);
    expect(firstItem.textContent).toEqual(MOCK_DATA[0].event_name)
});

