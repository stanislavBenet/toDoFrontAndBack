import { useState, useEffect } from "react";
import PopUpTask from "../popUp";
import { API_BASE } from "../../../constants";
import styles from "./tasks.module.css"




export default function Tasks() {
    const [todos, setTodos] = useState([]);



    const GetTodos = () => {
        fetch(API_BASE + "/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err))
    }

    useEffect(() => {

        GetTodos();
        console.log(todos)
    }, [todos])


    const handlerComplete = async id => {
        const data = await fetch(API_BASE + "/todo/complete/" + id, { method: "put" })
            .then(res => res.json());


        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.complete = data.complete;
            }

            return todo;
        }))
    }


    const handlerDelete = async id => {
        const data = await fetch(API_BASE + "/todo/delete/" + id, { method: "delete" })
            .then(res => res.json())


        setTodos(todos => todos.filter(todo => todo._id !== data._id))
    }

    return (
        <div>
            <h1>Welcome, Stan</h1>
            <h2>Your Tasks</h2>

            <div className={styles.todos}>
                {todos.map(todo => (<div className={styles.todo + ' ' + (todo.complete ? styles.isComplete : "")} key={todo._id} >
                    <div className={styles.checkbox} onClick={() => handlerComplete(todo._id)} ></div>
                    <div className={styles.text} onClick={() => handlerComplete(todo._id)} >{todo.text}</div>
                    <div className={styles.deleteTodo} onClick={() => handlerDelete(todo._id)}>X</div>
                </div>))}
            </div>
            <PopUpTask todos={todos} setTodos={setTodos} />
        </div>

    );
}
