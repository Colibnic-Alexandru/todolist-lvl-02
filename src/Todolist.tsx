import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsTodolistType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    addTask: (todolistID: string,title: string) => void
    removeTask: (todolistID: string,id: string) => void
    changeTaskStatus: (todolistID: string,id: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string,taskID: string, newTitle: string) => void
    changeTodolistFilter: (todolistID: string,value: FilterType) => void
    removeTodolist: (todolistID: string) => void
    filter: FilterType
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist = (props: PropsTodolistType) => {

   const addTaskHandler = (title:string) => {
         props.addTask(props.todolistID,title)
   }

    const onChangeFilterHandler = (value: FilterType) => {
        props.changeTodolistFilter(props.todolistID,value)
    }

    const onChangeTodolistTitleHandler = (newTitle: string) => {
    props.changeTodolistTitle(props.todolistID,newTitle)
    }

    return (
        <div className='wrapper'>
            <div className='wrapperBox'>
                <h3>
                   <EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
                    <button onClick={()=>props.removeTodolist(props.todolistID)}>X</button>
                </h3>
                <div className='errorMessage'>
                    <AddItemForm addItem={addTaskHandler}/>
                </div>

                <ul>
                    {props.tasks.map((el) => {
                        const removeTaskHandler = () => {
                            props.removeTask(props.todolistID,el.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todolistID,el.id, e.currentTarget.checked)
                        }
                        const onChangeTitleHandler = (newTitle: string) => {
                            props.changeTaskTitle(props.todolistID,el.id, newTitle);
                        }
                        return (
                            <li>
                                <input type={'checkbox'}
                                       checked={el.isDone}
                                       onChange={onChangeStatusHandler}/>
                                <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                                <button onClick={removeTaskHandler}>X
                                </button>
                            </li>
                        )
                    })}

                </ul>
                <div className='btnBox'>
                    <button className={props.filter === 'All' ? 'active-filter' : ''}
                            onClick={() => onChangeFilterHandler('All')}>All
                    </button>
                    <button className={props.filter === 'Active' ? 'active-filter' : ''}
                            onClick={() => onChangeFilterHandler('Active')}>Active
                    </button>
                    <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                            onClick={() => onChangeFilterHandler('Completed')}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

