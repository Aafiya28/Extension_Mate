import { Fragment, useEffect, useState } from "react";
import { Todo } from "../../component/Todo/Todo";
import { useBrowser } from "../../context/browser-context";
import { quotes } from "../../db/quotes";
import "./Task.css";

const index = Math.floor(Math.random() * quotes.length);
const quote = quotes[index].quote;

export const Task = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [isTodoOpen, setIsTodoOpen] = useState(false);

    const {name, time, message, task, browserDispatch} = useBrowser();

    useEffect(() => {
        const userTask = localStorage.getItem("task");
        browserDispatch({
            type: "TASK",
            payload: userTask
        },[])
    })

    useEffect(() => {
        const checkedStatus = localStorage.getItem('checkedStatus')
        checkedStatus === true ? setIsChecked(true) : setIsChecked(false)
    }, [])

    useEffect(() => {
        getCurrentTime();
    })

    const getCurrentTime = () => {
        const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();

        const hour = hours < 10 ? `0${hours}` : hours;
        const minute = minutes < 10 ? `0${minutes}` :  minutes;

        const currentTime = `${hour}:${minute}`
        // setTimeout(getCurrentTime, 1000);

        browserDispatch({
            type: "TIME",
            payload: currentTime
        })

        browserDispatch({
            type: "MESSAGE",
            payload: hours
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    const handleTaskChange = (event) => {
        if(event.key === "Enter" && event.target.value.length > 0){
            browserDispatch({
                type: 'TASK',
                payload: event.target.value
            })
            localStorage.setItem('task', event.target.value);
            localStorage.setItem('data', new Date.getData());
        }
    }

    const handleTaskStatusChange = (event) => {
        if(event.target.checked) {
            setIsChecked(isChecked => !isChecked)
        } else {
            setIsChecked(isChecked => !isChecked)
        }
        localStorage.setItem("checkedStatus", isChecked)
    }

    const handleRemoveTask  = () => {
        browserDispatch({
            type: "CLEAR"
        })
        setIsChecked(false)
        localStorage.removeItem("task")
        localStorage.removeItem("checkedStatus")
    }

    const handleTodoClick = () => {
        setIsTodoOpen(isTodoOpen => !isTodoOpen)
    }

    return (
        <div className="task-container d-flex direction-column align-center gap">
            <span className="time">{time}</span>
            <span className="message">{message}, {name}</span>
            { name !== null && task === null ?
            (<Fragment>
                <span className="focus-question gap">What is your main focus today ?</span>
                <form onSubmit={handleFormSubmit}>
                    <input required className="input task-input" onKeyPress={handleTaskChange}/>
                </form>
            </Fragment>) :
            (<div className="user-task-container d-flex direction-column align-center gap">
                <span className="heading-2 gap">Today's Focus</span>
                <div className="d-flex align-center gap cursor">
                    <label className={`${isChecked ? 'strike-through' : ""} heading-3 d-flex align-center gap cursor`}>
                        <input className="check cursor gap" type="checkbox" onChange={handleTaskStatusChange} checked={isChecked} />
                        {task}
                    </label>
                    <button className="button cursor" onClick={handleRemoveTask}>
                        <span class="material-icons-outlined">
                            clear
                        </span>
                    </button>
                </div>
            </div>)}
            <div className="quote-container">
                <span className="heading-3">{quote}</span>
            </div>
            { isTodoOpen && <Todo/> }
            <div className="todo-btn-container absolute">
                <button className="todo-btn button cursor" onClick={handleTodoClick}>ToDo</button>
            </div>
        </div>
        
    )
}