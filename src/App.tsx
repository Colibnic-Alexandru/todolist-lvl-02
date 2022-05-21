import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type AppTaskType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "FrontEnd Skills", filter: "All"},
        {id: todolistId_2, title: "What to buy", filter: "All"},
    ])

    const [tasks, setTasks] = useState<AppTaskType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Oil", isDone: true},
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Salt", isDone: false},
        ]
    })

    // Function Tasks

    function addTask(todolistID: string,title: string) {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks,[todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function removeTask(todolistID: string,taskID: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el => el.id !== taskID)})
    }

    function changeTaskStatus(todolistID: string,taskID: string, isDone: boolean) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el => el.id === taskID ? {...el, isDone} : el)})
    }

    function changeTaskTitle (todolistID: string,taskID: string, newTitle: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)})
    }

    // Function Todolist

    function addTodolist(title: string) {
        const newTodolistId = v1();
        const newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "All"};
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks,[newTodolistId]:[]})

    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    function changeTodolistTitle(todolistID: string, newTitle: string) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }

    function changeTodolistFilter(todolistID: string, value: FilterType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    const todolistComponents = todolists.map(el => {

        let taskForTodolist = tasks[el.id]

        if (el.filter === 'Active') {
            taskForTodolist = tasks[el.id].filter(el => !el.isDone)
        }
        if (el.filter === 'Completed') {
            taskForTodolist = tasks[el.id].filter(el => el.isDone)
        }

        return(
            <Todolist
                key={el.id}
                todolistID={el.id}
                title={el.title}
                tasks={taskForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodolistFilter={changeTodolistFilter}
                filter={el.filter}
                removeTodolist={removeTodolist}
                changeTodolistTitle={changeTodolistTitle}
            />
        )
    })


    return (
        <div className='App'>
            <div className='header'>
                <h2>Todolist</h2>
                <div className='errorMessage'><AddItemForm addItem={addTodolist}/></div>
            </div>
            <div className='main'>
                {todolistComponents}
            </div>
        </div>
    );
}

export default App;