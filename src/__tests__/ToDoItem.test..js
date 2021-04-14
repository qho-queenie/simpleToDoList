import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import ToDoItem from '../ToDoItem.js';
// @jest-environment jsdom

afterEach(cleanup);


test('renders index successfully', () => {
    render(<ToDoItem />)

});