import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ToDoItems from './ToDoItems';
import SortableTableHeader from './SortableTableHeader';
import SearchBar from './SearchBar';

import './styles/App.scss';

const LOCAL_STORAGE_KEY_DATA = 'todoApp.todos';

const tomrISO = new Date().toISOString().split('T')[0];
const todayISO = new Date().toDateString();

const App = () => {
    const [todos, setToDos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [statusMessage, setStatusMessage] = useState('Today is ' + todayISO);
    const [searchResults, setSearchResults] = useState([]);
    const [sortConfig, setSortConfig] = useState({});
    const [todoInputValue, setTodoInputValue] = useState('');
    const [dateInputValue, setDateInputValue] = useState('');
    const [isDateInvalid, setIsDateInvalid] = useState(false);
    const [hasTaskInputBeenTouched, setHasTaskInputBeenTouched] = useState(false);

    const isAddButtonDisabled = (!todoInputValue && hasTaskInputBeenTouched) || !todoInputValue || !dateInputValue || isDateInvalid;
    const hasCompletedItem = !todos.some(({ completed }) => completed);
    const numOfIncompleteItem = todos.filter(({ completed }) => !completed).length;

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DATA));
        setToDos(storedTodos);
    }, []); // run and clean effect only once on mount and unmount, this effect doesnt depend on any props or state so it never re-runs
    // we only call this retrieving from localStorage once, because we only need to load from saved items when page first loads up, never again

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(todos));
    }, [todos]);

    // the reason why I am using a combo of useState and useEffect for the search function is clearity:
    // another more straight-forward way is to display whatever tasks that match the search terms when there is any length to searchResults,
    // which the display can just be a var but not the todo list itself
    // if there is any match display them, if none it will just display the whole list (results with no search words entered equals the complete list)
    // however, I would be using 'searchResults' in place of 'todos' directly. This creates confusion as to what are we displaying? 
    // searchResults cause we are searching ? Or todos cause we are not searching
    useEffect(() => {
        const results = [...todos].filter(x => x.name.includes(searchText));
        if (results.length > 0) {
            setSearchResults(results);
        }
        else {
            setSearchResults([]);
        }
    }, [searchText, todos]);

    useEffect(() => {
        setTimeout(() => setStatusMessage('Today is ' + todayISO), 5000);
    }, [statusMessage]);

    const handleAddItem = () => {
        const newTodoItem = {
            id: uuidv4(),
            name: todoInputValue,
            due: dateInputValue,
            completed: false
        };

        setToDos([...todos, newTodoItem]);

        setTodoInputValue('');
        setDateInputValue('');
        setHasTaskInputBeenTouched(false);

        setStatusMessage('A new task has been added');
    }

    const handleDateInputChange = (typedDateInput) => {
        setDateInputValue(typedDateInput);
        if (typedDateInput < tomrISO) {
            setIsDateInvalid(true);
        } else {
            setIsDateInvalid(false);
        }
    }

    const handleCompleteItem = (itemID) => {
        const toToggleItem = todos.find(({ id }) => id === itemID);
        toToggleItem.completed = !toToggleItem.completed;
        setToDos([...todos]);
    }

    const handleClearItems = () => {
        const toRemainItems = todos.filter(({ completed }) => !completed);
        setToDos(toRemainItems);

        setStatusMessage('Task(s) have been removed');
    }

    const onSortColumn = (columnToSort) => {
        let direction;

        // 1. if dont exists --> destroy everything in it, create this key
        // 2. if exists -->> flip it
        if (sortConfig['columnKey'] !== columnToSort) {
            direction = 'asc';
        }
        if (sortConfig['columnKey'] === columnToSort) {
            direction = sortConfig['dirToSort'] === 'asc' ? 'des' : 'asc';
        }

        const newSortConfig = {
            columnKey: columnToSort,
            dirToSort: direction
        };

        setSortConfig(newSortConfig);
    }

    const sortTodos = () => {
        if (sortConfig) {
            let colToSort = sortConfig['columnKey'];
            let direction = sortConfig['dirToSort'];

            if (todos) {
                if (colToSort === 'date' && direction === 'des') {
                    todos.sort((a, b) => {
                        return new Date(a.due) - new Date(b.due);
                    })
                } else {
                    todos.sort((a, b) => {
                        return new Date(b.due) - new Date(a.due);
                    })
                }
            }

            if (colToSort === 'task') {
                todos.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return direction === 'asc' ? -1 : 1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return direction === 'asc' ? 1 : -1;
                    }
                });
            }
        }
        return todos;
    }

    const sortedTodos = sortTodos();

    const onSearchTaskText = searchText => {
        setSearchText(searchText.trim().toLowerCase());
    };

    return (
        <div className={'mainContent'}>
            <h1>A To Do List</h1>

            <p className={'statusBar'}>
                &nbsp;{statusMessage}
            </p>

            <SearchBar
                onSearchTaskText={onSearchTaskText}
            />

            <table>
                <thead>
                    <tr>
                        <th>
                            Completion
                        </th>
                        <th>
                            <SortableTableHeader
                                sortConfig={sortConfig}
                                onSortColumn={onSortColumn}
                                colName='task'
                            />
                        </th>
                        <th>
                            <SortableTableHeader
                                sortConfig={sortConfig}
                                onSortColumn={onSortColumn}
                                colName='date'
                            />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {/* { 1: as long as there is no todos at all, or there is a todo but not searching the component todoItems should handle it} */}
                    {/* { 2: if there arent any search results and the user isnt searching, display there is no search results} */}
                    {/* { 3: lastly, if searching and there are results, hand over the searchResults to component todoItems to handle} */}
                    {todos.length === 0 || (todos.length > 0 && !searchText)
                        ? <ToDoItems todos={sortedTodos} onCompleteItem={handleCompleteItem} />
                        : (searchResults.length === 0 && searchText
                            ? <tr>
                                <td>No search results</td>
                            </tr>
                            : <ToDoItems todos={searchResults} searchMode={true} searchText={searchText} onCompleteItem={handleCompleteItem} />
                        )
                    }
                </tbody>

            </table>

            <div className={'variousInputs'}>
                <input
                    className={!todoInputValue && hasTaskInputBeenTouched ? 'invalid' : ''}
                    type='text'
                    placeholder='event name'
                    maxLength='15'
                    value={todoInputValue}
                    onBlur={() => setHasTaskInputBeenTouched(true)}
                    onChange={e => setTodoInputValue(e.target.value)}
                />
                <input
                    className={isDateInvalid ? 'invalid' : ''}
                    type="date"
                    min={tomrISO}
                    value={dateInputValue}
                    onChange={e => handleDateInputChange(e.target.value)}
                />
                <button
                    onClick={handleAddItem}
                    disabled={isAddButtonDisabled}
                >
                    Add
                </button>
                <button
                    onClick={handleClearItems}
                    disabled={hasCompletedItem}
                >
                    Clear Selected Items
                </button>
            </div>
            <h3>Number of remaining to-do items: {numOfIncompleteItem}</h3>
        </div>
    )
}

export default App;
