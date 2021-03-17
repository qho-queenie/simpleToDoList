import React from 'react'

export default function EachItem({eachItem, toggleCompleted}) {
    function toggleCompletedClick(){
        toggleCompleted(eachItem.id);
    }
    return (
        <tr>
            <td><input type='checkbox' checked={eachItem.completed} onChange={toggleCompletedClick} /></td>
            <td>{eachItem.name}</td>
            <td className={+(new Date(eachItem.due)) <= +(new Date())? 'overdue' : 'notDueYet'}>{eachItem.due}</td>
        </tr>
    )
}
