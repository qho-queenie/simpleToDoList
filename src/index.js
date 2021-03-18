import React, {useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid'; 

import ToDoItems from './ToDoItems';
import './index.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';
const tomrISO = new Date().toISOString().split('T')[0];

function App() {
    const toDoInput = useRef();
    const dueDateInput = useRef();
    const [todos, setToDos] = useState([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        setToDos(storedTodos)
    }, []); // run and clean effect only once on mount and unmount, this effect doesnt depend on any props or state so it never re-runs
    //we only call this retrieving from localStorage once, because we only need to load from saved items when page first loads up, never again

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
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
        setToDos(toRemainItems);
    }

    return(
        <div>
            <h1>A To Do List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Completion</th>
                        <th>Task</th>
                        <th>Due Date</th>
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
