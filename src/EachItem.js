import React from 'react'

export default function EachItem({eachItem, toggleCompleted}) {
    const toggleCompletedClick = () => {
        toggleCompleted(eachItem.id);
    }
    return (
        <tr className={+(new Date(eachItem.due)) <= +(new Date())? 'overdue' : 'notDueYet'}>
            <td><input type='checkbox' checked={eachItem.completed} onChange={toggleCompletedClick} /></td>
            <td>{eachItem.name}</td>
            <td>{eachItem.due}</td>
        </tr>
    )
}
