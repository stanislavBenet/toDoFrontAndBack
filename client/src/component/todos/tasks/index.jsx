import { useState, useEffect } from "react";
import PopUpTask from "../popUp";
import { API_BASE } from "../../../constants";
import styles from "./tasks.module.css"
import ItemComponent from "../todo";




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


    }, []);


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
                {todos.map(todo =>
                    <ItemComponent key={todo._id} todo={todo} handlerComplete={handlerComplete} handlerDelete={handlerDelete} />)}
            </div>
            <PopUpTask todos={todos} setTodos={setTodos} />
        </div>

    );
}
