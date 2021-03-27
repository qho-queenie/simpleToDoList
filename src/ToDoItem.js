import React from 'react';

const ToDoItem = ({ item, toggleCompleteItem }) => {
    const { id, name, due, completed } = item;
    const isOverDue = new Date(due) <= new Date() ? true : false;

    return (
        <tr className={isOverDue ? 'overdue' : 'notDueYet'}>
            <td><input type='checkbox' checked={completed} onChange={() => toggleCompleteItem(id)} /></td>
            <td>{name}</td>
            <td>{due}</td>
        </tr>   
    )
}

export default ToDoItem;
