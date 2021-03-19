import React from 'react'
import EachItem from './EachItem';

export default function ToDoItems({ todos, toggleCompleted }) {
    return (
        todos.map(eachItem => {
            return (
                <EachItem key={eachItem.id} eachItem={eachItem} toggleCompleted={toggleCompleted} />
            )
        })
    )
}


