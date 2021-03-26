import React from 'react';

const TaskItem = ({ task, toggleCompleted }) => {
    const {id, name, due, completed} = task;

    const toggleCompletedClick = () => {
        toggleCompleted(id);
    }
    return (
        <tr className={(new Date(due)) <= (new Date()) ? 'overdue' : 'notDueYet'}>
            <td><input type='checkbox' checked={completed} onChange={toggleCompletedClick} /></td>
            <td>{name}</td>
            <td>{due}</td>
        </tr>
    )
}

export default TaskItem;
