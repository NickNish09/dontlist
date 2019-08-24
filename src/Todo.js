import React, { useState, useEffect } from 'react';
import './App.css';
import firestore from './Firestore';
import * as firebase from "firebase";

function Todo() {
  const [todos, setTodos] = useState([
    {
      content: '',
      isCompleted: false,
    },
  ]);
  const db = firebase.firestore();
  const dbRef = db.collection(`${window.location.pathname}`);

  useEffect(()=> {

    dbRef.get().then(function(collection) {
      let t = collection.docs.map(doc => doc.data());
      t.push({
        content: '',
        isCompleted: false,
      });
      // console.log(t);
      setTodos(t);
    }).catch(function(error) {
      console.log("Error getting collection:", error);
    });
  },[]);

  function handleKeyDown(e, i) {
    if (e.key === 'Enter') {
      createTodoAtIndex(e, i);
    }
    if (e.key === 'Backspace' && todos[i].content === '') {
      e.preventDefault();
      return removeTodoAtIndex(i);
    }
  }

  function createTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);

    updateDataBase(newTodos);
  }

  function updateDataBase(newTodos) {
    newTodos.map((todo) => {
      if(todo.content === ""){
        return;
      }
      return dbRef.doc(todo.content).set(
        {
          content: todo.content,
          isCompleted: todo.isCompleted
        }
      );
    });
  }

  function updateTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  }

  function removeTodoAtIndex(i) {
    if (i === 0 && todos.length === 1) return;
    setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
    setTimeout(() => {
      document.forms[0].elements[i - 1].focus();
    }, 0);
  }

  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
    updateDataBase(temporaryTodos);
  }

  return (
    <div className="app">
      <h1 className={'text-white'}>{window.location.pathname}</h1>
      <form className="todo-list">
        <ul>
          {todos.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
              <div className={'checkbox'} onClick={() => toggleTodoCompleteAtIndex(i)}>
                {todo.isCompleted && (
                  <span>&#x2714;</span>
                )}
              </div>
              <input
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </div>
          ))}
        </ul>
      </form>

    </div>
  );
}

export default Todo;
