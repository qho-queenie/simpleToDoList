import React from "react";
import { shallow, mount } from "enzyme";
import { expect, should, chaiDom } from 'chai';
import App from "./App";

// MethodName_StateUnderTest_ExpectedBehavior
// MethodName_ExpectedBehavior_StateUnderTest
// Should_ExpectedBehavior_When_StateUnderTest
// When_StateUnderTest_Expect_ExpectedBehavior

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

    it("the Add button is disabled", () => {
        const addButton = wrapper.find('.addButton');
        expect(getByTestId('addButton')).toBeDisabled()
    });
});