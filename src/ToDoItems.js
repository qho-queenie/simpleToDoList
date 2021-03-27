import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoItems = ({ todos, toggleCompleteItem }) => {
    return (
        todos.map(item => {
            return (
                <ToDoItem key={item.id} item={item} toggleCompleteItem={toggleCompleteItem} />
            )
        })
    )
}

export default ToDoItems;
