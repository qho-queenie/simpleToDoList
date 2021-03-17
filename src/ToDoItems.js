import React from 'react'
import EachItem from './EachItem';

export default function ToDoItems({ todos, toggleCompleted }) {
    const preSortedItems = todos;
    let sortedItems = [...preSortedItems];

    sortedItems.sort((a,b) => {
        if(+(new Date(a.due)) < +(new Date(b.due))) return -1;
        if(+(new Date(a.due)) > +(new Date(b.due))) return 1;
        return 0;
    });

    return (
        
        sortedItems.map(eachItem => {
            return (

                <EachItem key={eachItem.id} eachItem={eachItem} toggleCompleted={toggleCompleted} />

            )
        })
    )
}


