import { useState, useEffect } from "react";
import PopUpTask from "../popUp";
import { API_BASE } from "../../../constants";
import styles from "./tasks.module.css"




export default function Tasks() {
    const [todos, setTodos] = useState([]);
    const [gradientWidth, setGradientWidth] = useState(100);
    const [initialTime, setInitialTime] = useState(4)
    const [duration, setDuration] = useState(initialTime - 1);

    const GetTodos = () => {
        fetch(API_BASE + "/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err))
    }

    useEffect(() => {
        console.log(gradientWidth, duration)

        const intervalId = setInterval(() => {
            setGradientWidth((duration / initialTime) * 100);
            setDuration(prevDuration => prevDuration - 1);
        }, 1000);
        if (duration == -1) {
            clearInterval(intervalId);
        }
        GetTodos();


        return () => clearInterval(intervalId);
    }, [duration]);


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

    const intervalStyle = {
        backgroundImage: `linear-gradient(to left, rgba(40, 40, 138, 1) ${gradientWidth}%, transparent ${gradientWidth}%)`,
        transition: 'background-image 0.5s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div>
            <h1>Welcome, Stan</h1>
            <h2>Your Tasks</h2>

            <div className={styles.todos}>
                {todos.map(todo => (<div className={styles.todo + ' ' + (todo.complete ? styles.isComplete : "")}
                    style={{ ...intervalStyle }}
                    key={todo._id} >
                    <div className={styles.checkbox} onClick={() => handlerComplete(todo._id)} ></div>
                    <div className={styles.text} onClick={() => handlerComplete(todo._id)} >{todo.text}</div>
                    <div className={styles.deleteTodo} onClick={() => handlerDelete(todo._id)}>X</div>
                </div>))}
            </div>
            <PopUpTask todos={todos} setTodos={setTodos} />
        </div>

    );
}
