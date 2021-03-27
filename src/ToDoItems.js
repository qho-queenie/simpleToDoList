import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoItems = ({ todos, onCompleteItem }) => {
    return (
        todos.map(item => {
            return (
                <ToDoItem key={item.id} item={item} onCompleteItem={onCompleteItem} />
            )
        })
    )
}

export default ToDoItems;
