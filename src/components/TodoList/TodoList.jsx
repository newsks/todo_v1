import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css'

export default function TodoList({filter}) {   //모든 해야할 일을 담고있는 데이터
    const [todos, setTodos] = useState(()=> readTodos());  //계속 불러오지 않도록 콜백함수로 감싸줘야한다
   const handleAdd = (todo) => setTodos([...todos, todo]);
   const handleUpdate = (updated) => setTodos(todos.map((t)=>(t.id === updated.id? updated : t)));
   const handleDelete = (deleted) => setTodos(todos.filter((t)=>(t.id !== deleted.id)));
    
   useEffect(()=>{
     localStorage.setItem('todos', JSON.stringify(todos));
   },[todos]);
   const filtered = getFilterItems(todos, filter);
    return (
     <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
            <Todo 
              key={item.id} 
              todo={item} 
              onUpdate={handleUpdate} 
              onDelete={handleDelete}
            />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd}/> 
    </section>
    );
}

function readTodos(){
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}
function getFilterItems(todos, filter){
  if (filter ==='all'){
    return todos;
  }
  return todos.filter((todo) => todo.status === filter)
}