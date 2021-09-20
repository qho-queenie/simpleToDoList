import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoItems = ({ todos, onCompleteItem }) => {
    if (todos.length > 0) {
        return (
            todos.map(item => {
                return (
                    <ToDoItem key={item.id} item={item} onCompleteItem={onCompleteItem} />
                )
            })
        )
    } else {
        return (
            <tr>
                <td>No tasks, start entering a new task below</td>
            </tr>
        )

    }
}

export default ToDoItems;
