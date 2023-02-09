import React, { useState, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./TodoList.module.scss"

const cx= classNames.bind(styles);

function ToDoListComponent() {
const inputRef=useRef()
  const [todo, setTodo] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) ?? [];
  });

  const [job, setJob] = useState("");

  const handleAdd = () => {
    setJob("");
    inputRef.current.focus();
    setTodo((prev) => {
      // Save to localStorage
      const newTodo = [...prev, job];
      const jsonTodos = JSON.stringify(newTodo);
      localStorage.setItem("todos", jsonTodos);
      return newTodo;
    });
  };

  const handleDelete = (x) => {
    inputRef.current.focus();
    setTodo((prev) => {
      // Save to localStorage
      const newTodo = prev.filter((y) => y !== x);
      const jsonTodos = JSON.stringify(newTodo);
      localStorage.setItem("todos", jsonTodos);
      return newTodo;
    });
  };
  const handleEdit=(param)=>{
    if (job === "") {
        setJob("");
        setTodo(todo);
        alert("Vui lòng nhập thông tin vào ô Input sau đó nhấn Edit");
      } else {
        todo.splice(param, 1, job);
        const jsonTodos = JSON.stringify(todo);
        localStorage.setItem("todos", jsonTodos);
        setTodo(todo);
        setJob("");
      };
  };

  return (
    <div className={cx('todoListMain')}>
      <h1>To Do List</h1>
      <input
        className={cx('header-input')}
        onChange={(e) => setJob(e.target.value)}
        placeholder="Add new todo"
        value={job}
        ref={inputRef}
      />
      <button className={cx('header-button')} onClick={handleAdd}> Add</button>
      <ul className={cx('theList')}>
        {todo.length === 0 ? (
          <p>List is empty</p>
        ) : (
          todo.map((todo, index) => (
            <li key={index} className={cx('theList-li')}>
              {todo}
              <button className={cx('item-li')} onClick={() => handleDelete(todo)}>X</button>
              <button className={cx('item-li')} onClick={() => handleEdit(index)}>Edit</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className={cx('App')} style={{ padding: 32 }}>
      <ToDoListComponent></ToDoListComponent>
    </div>
  );
}

export default App;
