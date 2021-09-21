import React from 'react';

const ToDoItem = ({ item, onCompleteItem, searchMode, searchText }) => {
    const { id, name, due, completed } = item;
    const isOverDue = new Date(due) <= new Date();

    // creating the markup for highting text, this should belong to a separate file that can be used everywhere in the app
    // but given the scale of the app, keeping it here and 'hardcoded is fine'
    const highlightText = text => {
        return text.name.replace(searchText, match => `<mark style="background-color: #ffd700;">${match}</mark>`);
    }

    return (
        <tr className={isOverDue ? 'overdue' : 'notDueYet'}>
            <td>
                <input
                    type='checkbox'
                    checked={completed}
                    onChange={() => onCompleteItem(id)}
                />
            </td>

            {
                !searchMode
                    ? <td>
                        {name}
                    </td>
                    : <td
                        dangerouslySetInnerHTML={{ __html: highlightText({ name }) }} >
                    </td>
            }

            <td>{due}</td>
        </tr>
    )
}

export default ToDoItem;
