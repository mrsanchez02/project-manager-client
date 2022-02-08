import React, { useReducer } from "react";
import TaskContext from './taskContext';
import taskReducer from "./taskReducer";

import {
    TASK_PROJECT,
    ADD_TASK,
    CHECK_TASK,
    DELETE_TASK,
    STATUS_TASK,
    ACTUAL_TASK,
    UPDATE_TASK,
    CLEAR_TASK,
} from '../../types';


const TaskState = ({children}) => {
    const initialState = {
        tasks:[
            {id: 1, name: "Elegir plataforma",status: true, projectId: 1},
            {id: 2, name: "Elegir colores",status: false, projectId: 2},
            {id: 3, name: "Elegir plataformas de pago",status: false, projectId: 3},
            {id: 4, name: "Elegir hosting",status: true, projectId: 4},
            {id: 5, name: "Elegir plataforma",status: true, projectId: 1},
            {id: 6, name: "Elegir colores",status: false, projectId: 2},
            {id: 7, name: "Elegir plataformas de pago",status: false, projectId: 3},
            {id: 8, name: "Elegir plataforma",status: true, projectId: 4},
            {id: 9, name: "Elegir colores",status: false, projectId: 1},
            {id: 10, name: "Elegir plataformas de pago",status: false, projectId: 2},
            {id: 11, name: "Elegir plataforma",status: true, projectId: 3},
            {id: 12, name: "Elegir colores",status: false, projectId: 4},
            {id: 13, name: "Elegir plataformas de pago",status: false, projectId: 3},
        ],
        tasksProject:null,
        errorTask:false,
        taskSelected:null
    }

    // Crear dispatch y state;
    const [state, dispatch]= useReducer(taskReducer,initialState);

    // Fn

    // Get Tasks from a project.
    const getTasks = projectId => {
        dispatch({
            type:TASK_PROJECT,
            payload: projectId
        })
    }

    //Add task to a selected project.
    const addTask = task => {
        dispatch({
            type:ADD_TASK,
            payload:task
        })
    }

    // Check & verify task's field on FormTask component.
    const verifyTask = () => {
        dispatch({
            type: CHECK_TASK
        })
    }

    //Delete task.
    const deleteTask = id => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        })
    }

    //Switch tarea status.
    const switchTaskStatus = task => {
        dispatch({
            type:STATUS_TASK,
            payload:task
        })
    }

    // Extract a task to edit.
    const saveActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

    // Edit or update a task.
    const updateTask = task => {
        dispatch({
            type:UPDATE_TASK,
            payload: task
        })
    }

    // Clear the selected task.
    const clearTask = () => {
        dispatch({type:CLEAR_TASK})
    }

    return (
        <TaskContext.Provider
            value={{
                tasks:state.tasks,
                tasksProject: state.tasksProject,
                errorTask:state.errorTask,
                taskSelected: state.taskSelected,
                getTasks,
                addTask,
                verifyTask,
                deleteTask,
                switchTaskStatus,
                saveActualTask,
                updateTask,
                clearTask
            }}
        >{children}
        </TaskContext.Provider>
    )
}

export default TaskState;