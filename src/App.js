import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ToDoItems from './ToDoItems';
import SortableTableHeader from './SortableTableHeader';
import SearchBar from './SearchBar';
import './styles/App.scss';

const LOCAL_STORAGE_KEY_DATA = 'todoApp.todos';

const tomrISO = new Date().toISOString().split('T')[0];

const App = () => {
    const [todos, setToDos] = useState([]);
    const [searchText, setSearchText] = useState('');
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

    useEffect(() => {
        const results = [...todos].filter(x => x.name.includes(searchText));
        setSearchResults(results);
    }, [searchText]);

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
                    <ToDoItems

                        todos={searchResults.length ? searchResults : sortedTodos} onCompleteItem={handleCompleteItem} />
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
