import React, {useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid'; 

import ToDoItems from './ToDoItems';
import './index.css';

const LOCAL_STORAGE_KEY_DATA = 'todoApp.todos';

const tomrISO = new Date().toISOString().split('T')[0];

function App() {
    const toDoInput = useRef();
    const dueDateInput = useRef();
    const [todos, setToDos] = useState([]);
    const [sortConfig, setSortConfig] = useState({});

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DATA));
        setToDos(storedTodos)
    }, []); // run and clean effect only once on mount and unmount, this effect doesnt depend on any props or state so it never re-runs
    // we only call this retrieving from localStorage once, because we only need to load from saved items when page first loads up, never again

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(todos))
    },[todos]); // this effect only fires if the todos array changes

    function handleAddItem(e) {
        const currentInput =  toDoInput.current.value;
        const pickedDueDate = dueDateInput.current.value;

        if(currentInput && pickedDueDate) {
            setToDos(prevList => {
                return [...prevList, { id:uuidv4(), name: currentInput, due: pickedDueDate, completed: false}]
            })
        }
        toDoInput.current.value = null;
        dueDateInput.current.value = null;
    }

    function toggleCompleted(e) {
        const currentTodos = [...todos];
        const toToggleItem = currentTodos.find(eachCurrentTodo => eachCurrentTodo.id === e);
        toToggleItem.completed = !toToggleItem.completed;
        setToDos(currentTodos);
    }

    function handleClearItems() {
        const currentTodos = [...todos];
        const toRemainItems = currentTodos.filter(eachCurrentTodo => !eachCurrentTodo.completed);
        console.log(toRemainItems, 'toRemainItems')
        setToDos(toRemainItems);
    }

    function sortBy(e) {
        const colToSort = e.target.value;
        const currentSort = sortConfig;
        const currentTodos = [...todos];
        let direction;

        if(!currentSort[colToSort]){
            console.log(currentSort, currentSort[colToSort])
            direction = 'asc';
        }
        else {
            direction = currentSort[colToSort] === 'asc'? 'desc' : 'asc'; 
        }
        currentSort[colToSort] = direction;
        setSortConfig(currentSort);

        if(currentTodos) {
            if(colToSort === 'date') {
                currentTodos.sort((a,b) => {
                    if(+(new Date(a.due)) < +(new Date(b.due))) return direction === 'asc'? -1 : 1;
                    if(+(new Date(a.due)) > +(new Date(b.due))) return direction === 'asc'? 1 : -1;
                    return 0;
                });
            }
            if(colToSort === 'task') {
                currentTodos.sort((a,b) => {
                    if(a.name > b.name) return direction === 'asc'? -1 : 1;
                    if(a.name < b.name) return direction === 'asc'? 1 : -1;
                    return 0;
                });
            }
            setToDos(currentTodos);
        }
    }
    return(
        <div>
            <h1>A To Do List</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            Completion
                        </th>
                        <th> 
                            <button type="button" value='task' onClick={sortBy}>Task</button>
                        </th>
                        
                        <th>
                            <button type="button" value='date' onClick={sortBy}>Due Date</button>
                        </th>
                    </tr>
                </thead>  

                <tbody>  
                    <ToDoItems todos={todos} toggleCompleted={toggleCompleted} />
                </tbody>  
            </table>
            <input type='text' placeholder='event name'ref={toDoInput} />
            <input type="date" min={tomrISO} ref={dueDateInput}/> <button onClick={handleAddItem}> Add </button>
            <hr></hr>
            <button onClick={handleClearItems}> Clear Selected Items </button>
            <h3>Number of remaining to-do items: {todos.length}</h3>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
