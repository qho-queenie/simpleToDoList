import React from "react";
import { shallow } from "enzyme";
import { expect } from 'chai';
import App from "./App";

const wrapper = shallow(<App />);

it("renders without crashing", () => {
    shallow(<App />);
});

describe("<App /> without any props", () => {
    it("renders the title correctly", () => {
        const header = <h1>A To Do List</h1>;
        expect(wrapper.contains(header)).to.equal(true);
    });

    it("renders a table", () => {
        const table = wrapper.find('table');
        expect(table).to.have.lengthOf(1);
    });

    it("renders 2 inputs", () => {
        const input = wrapper.find('input');
        expect(input).to.have.lengthOf(2);
    });

    // https://www.npmjs.com/package/@testing-library/jest-dom
    // I have jest-dom so getByTestid should work
    it("the Add button is disabled", () => {
        const addButton = wrapper.find('.addButton');
        expect(getByTestId('addButton')).toBeDisabled()
    });
});
