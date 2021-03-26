import React from 'react';
import TaskItem from './TaskItem';

const ToDoItems = ({ todos, toggleCompleted }) => {
    return (
        todos.map(task => {
            return (
                <TaskItem key={task.id} task={task} toggleCompleted={toggleCompleted} />
            )
        })
    )
}

export default ToDoItems;