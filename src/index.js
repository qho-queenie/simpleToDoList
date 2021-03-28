import React, {useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import ToDoItems from './ToDoItems';
import './index.css';

const LOCAL_STORAGE_KEY_DATA = 'todoApp.todos';

const tomrISO = new Date().toISOString().split('T')[0];

const preSortIcon = <FontAwesomeIcon icon={faSort} />
const sortUpIcon = <FontAwesomeIcon icon={faSortUp} />
const sortDownIcon = <FontAwesomeIcon icon={faSortDown} />

const App = () => {
    const [todos, setToDos] = useState([]);
    const [sortConfig, setSortConfig] = useState({});
    const [disableAddButton, setAddButton] = useState(true);
    const [disableClearButton, setClearButton] = useState();

    const toDoInput = useRef();
    const dueDateInput = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DATA));
        setToDos(storedTodos);
    }, []); // run and clean effect only once on mount and unmount, this effect doesnt depend on any props or state so it never re-runs
    // we only call this retrieving from localStorage once, because we only need to load from saved items when page first loads up, never again

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(todos));
        enableClearButton();
    }, [todos]);

    const handleAddItem = () => {
        const currentInput = toDoInput.current.value;
        const pickedDueDate = dueDateInput.current.value;
        const newTodoItem = {
            id: uuidv4(),
            name: currentInput,
            due: pickedDueDate,
            completed: false
        };

        setToDos([...todos, newTodoItem]);
        toDoInput.current.value = null;
        dueDateInput.current.value = null;
        setAddButton(true);
    }

    const handleCompleteItem = (itemID) => {
        const toToggleItem = todos.find(({ id }) => id === itemID);
        toToggleItem.completed = !toToggleItem.completed;
        setToDos([...todos]);
        enableClearButton();
    }

    const handleClearItems = () => {
        const toRemainItems = todos.filter(({ completed }) => !completed);
        setToDos(toRemainItems);
        setClearButton(true);
    }

    const handleValidations = () => {
        if (!toDoInput.current.value || !dueDateInput.current.value) {
            setAddButton(true);
        } else {
            setAddButton(false);
        }
    }

    const enableClearButton = () => {
        const itemsToClear = todos.filter(({ completed }) => completed);
        if (itemsToClear.length === 0) {
            setClearButton(true);
        } else {
            setClearButton(false);
        }
    }

    const onSortColumn = (columnToSort) => {
        let direction;

        // 1. if exists -->> flip it
        // 2. if dont exists --> destroy everything in it, create this key
        if (sortConfig['columnKey'] === columnToSort){  
            direction = sortConfig['dirToSort'] === 'asc' ? 'des' : 'asc';
        } else {
            direction = 'asc';
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
        
            if (todos){
                if (colToSort === 'date'){
                    if (direction === 'asc'){
                        todos.sort((a, b) => {
                            return new Date(a.due) - new Date(b.due);
                        })
                    } else {
                        todos.sort((a, b) => {
                            return new Date(b.due) - new Date(a.due);
                        })
                    }
                }
                
                if (colToSort === 'task'){
                    todos.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()){
                            return direction === 'asc' ? -1 : 1;
                        } 
                        if (a.name.toLowerCase() < b.name.toLowerCase()){
                            return direction === 'asc' ? 1 : -1;
                        } 
                    });
                }
            }  
        }
        return todos;
    }

    const sortedTodos = sortTodos(); 
        
    return (
        <div>
            <h1>A To Do List</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            Completion
                        </th>
                        <th> 
                            <button type="button" onClick = {() => onSortColumn('task')}>
                                Task 
                                <i className="icon">{preSortIcon}</i>
                            </button>
                        </th>
                        
                        <th>
                            <button type="button" onClick = {() => onSortColumn('date')}>
                                Due Date
                                <i className="icon">{preSortIcon}</i>
                            </button>
                        </th>
                    </tr>
                </thead>  

                <tbody>  
                    <ToDoItems todos={sortedTodos} onCompleteItem={handleCompleteItem} />
                </tbody>  
            </table>
            <input type='text' placeholder='event name' ref={toDoInput} onChange={() => handleValidations()} />
            <input type="date" min={tomrISO} ref={dueDateInput}  onChange={() => handleValidations()} /> <button onClick={handleAddItem} disabled={disableAddButton}> Add </button>
            <hr></hr>
            <button onClick={handleClearItems} disabled={disableClearButton}> Clear Selected Items </button>
            <h3>Number of remaining to-do items: {todos.length}</h3>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
