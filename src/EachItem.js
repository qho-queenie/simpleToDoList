import React from 'react'

const Item = ({item, toggleCompleted}) => {
    const { id, name, due: dueAt, completed } = item;
    const classname = +(new Date(dueAt)) <= +(new Date()) ? 'overdue' : 'notDueYet';
   
    return (
        <tr className={classname}>
            <td><input type='checkbox' checked={completed} onChange={() => toggleCompleted(id)} /></td>
            <td>{name}</td>
            <td>{dueAt}</td>
        </tr>
    )
}

export default Item;
