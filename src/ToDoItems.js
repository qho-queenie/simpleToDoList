import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoItems = ({ todos, onCompleteItem, searchMode, searchText }) => {
    if (todos.length > 0) {
        return (
            todos.map(item => {
                return (
                    <ToDoItem
                        key={item.id}
                        item={item}
                        searchMode={searchMode}
                        searchText={searchText}
                        onCompleteItem={onCompleteItem}
                    />
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
