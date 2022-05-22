import React, { useState, useEffect } from 'react';
import './App.css';

// Importing Components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {


  ///// States

  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Functions

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true ));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false ));
        break;
      default:
        setFilteredTodos(todos)
        break

    }
  }

  // Run once when App starts
  useEffect(() => {
    getLocalTodos();
  },[]);


  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos, status]);

  //Save to Local Storage
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([])); 
    } else {
      const todoLocal = JSON.parse(localStorage.getItem('todos'));
      // console.log(todoLocal);
      setTodos(todoLocal);
    }
  }
 
  





  return (
    <div className="App">
      <header>
        <h1> Christopher's Todo List</h1>
      </header>
      <Form inputText={inputText} setInputText={setInputText} todos={todos} setTodos={setTodos} setStatus={setStatus}/>
      <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos}  />
    </div>
  );
}

export default App;

