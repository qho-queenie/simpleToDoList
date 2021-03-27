import React from 'react';

const ToDoItem = ({ item, onCompleteItem }) => {
    const { id, name, due, completed } = item;
    const isOverDue = new Date(due) <= new Date();

    return (
        <tr className={isOverDue ? 'overdue' : 'notDueYet'}>
            <td><input type='checkbox' checked={completed} onChange={() => onCompleteItem(id)} /></td>
            <td>{name}</td>
            <td>{due}</td>
        </tr>   
    )
}

export default ToDoItem;
