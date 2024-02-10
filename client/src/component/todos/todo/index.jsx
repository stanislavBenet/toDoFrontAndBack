import React, { useState, useEffect } from 'react'
import styles from "./todo.module.css"


export default function ItemComponent({ todo, handlerComplete, handlerDelete }) {

    const [gradientWidth, setGradientWidth] = useState(100);
    const [initialTime, setInitialTime] = useState(todo.deadLineTime)
    const [duration, setDuration] = useState(initialTime - 1);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (intervalId === null && duration >= 0) {
            const id = setInterval(() => {
                console.log('tick')
                setDuration((prevDuration) => prevDuration - 1);
            }, 1000);
            setIntervalId(id);
        }

        if (duration >= 0) {
            setGradientWidth((duration / initialTime) * 100);
        }
        if (duration < 0 && intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(false)
        }
        return () => clearInterval(intervalId);
    }, [duration]);
    
    return (
        <div className={styles.todo + ' ' + (todo.complete ? styles.isComplete : "")}
            style={{
                backgroundImage: `linear-gradient(to left, rgba(40, 40, 138, 1) ${gradientWidth}%, transparent ${gradientWidth}%)`,
                transition: 'background-image 0.5s ease',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className={styles.checkbox} onClick={() => handlerComplete(todo._id)} ></div>
            <div className={styles.text} onClick={() => handlerComplete(todo._id)} >{todo.text}</div>
            <div className={styles.deleteTodo} onClick={() => handlerDelete(todo._id)}>X</div>
        </div>
    );

}
