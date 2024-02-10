import React from 'react'
import { useState } from "react";
import styles from "./popUp.module.css"
import { API_BASE } from '../../../constants';

export default function PopUpTask({ todos, setTodos }) {

    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const [newTime, setNewTime] = useState('');


    const handlerAddTask = async () => {
        const data = await fetch(API_BASE + "/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo,
                deadLineTime: newTime
            })
        }
        ).then(res => res.json());

        setTodos([...todos, data])
        setPopupActive(false)
        setNewTodo({ task: '', time: '' })
    };

    return (<>
        <div className={styles.addPopup} onClick={() => setPopupActive(!popupActive)}>+</div>
        {
            popupActive ? (
                <div className={styles.popup}>
                    <div className={styles.closePopup} onClick={() => setPopupActive(false)}>x</div>
                    <div className={styles.content}>
                        <h2>Add task</h2>
                        <input
                            placeholder='write your task'
                            type="text"
                            className={styles.addTodoInput}
                            onChange={e => setNewTodo(e.target.value)}
                            value={newTodo.task}
                        ></input>
                        <input
                            placeholder='time (sec)'
                            type="text"
                            className={styles.addTodoInput}
                            onChange={e => setNewTime(e.target.value)}
                            value={newTodo.time}
                        ></input>
                        <div className={styles.button} onClick={handlerAddTask}>create new task</div>
                    </div>
                </div>) : ""
        }
    </>
    )
}
