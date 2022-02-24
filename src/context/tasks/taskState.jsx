import React, { useReducer } from "react";
import TaskContext from './taskContext';
import taskReducer from "./taskReducer";
import axiosClient from '../../config/axios';

import {
    TASK_PROJECT,
    ADD_TASK,
    CHECK_TASK,
    DELETE_TASK,
    ACTUAL_TASK,
    UPDATE_TASK,
    CLEAR_TASK,
} from '../../types';


const TaskState = ({children}) => {
    const initialState = {
        tasksProject:[],
        errorTask:false,
        taskSelected:{}
    }

    // Crear dispatch y state;
    const [state, dispatch]= useReducer(taskReducer,initialState);

    // Fn

    // Get Tasks from a project.
    const getTasks = async project => {
        console.log(project)
        try {
            const results = await axiosClient.get('/api/tasks',{ params: { project } });
            console.log(results);
            dispatch({
                type:TASK_PROJECT,
                payload: results.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Add task to a selected project.
    const addTask = async task => { 
        console.log(task);
        try {
            const results = await axiosClient.post('/api/tasks',task)
            console.log(results)
            dispatch({
                type:ADD_TASK,
                payload:task
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    // Check & verify task's field on FormTask component.
    const verifyTask = () => {
        dispatch({
            type: CHECK_TASK
        })
    }

    //Delete task.
    const deleteTask = async (id,project) => {
        try {
            await axiosClient.delete(`/api/tasks/${id}`,{params:{ project }});
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Edit or update a task.
    const updateTask = async task => {
        try {
            const results = await axiosClient.put(`/api/tasks/${task._id}`,task);
            dispatch({
                type:UPDATE_TASK,
                payload: results.data.task
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Extract a task to edit.
    const saveActualTask = task => {
        console.log(task)
        dispatch({
            type: ACTUAL_TASK,
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
                tasksProject: state.tasksProject,
                errorTask:state.errorTask,
                taskSelected: state.taskSelected,
                getTasks,
                addTask,
                verifyTask,
                deleteTask,
                saveActualTask,
                updateTask,
                clearTask
            }}
        >{children}
        </TaskContext.Provider>
    )
}

export default TaskState;