import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import axiosClient from '../../config/axios'
import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECTS,
    FORM_VALIDATION,
    ACTUAL_PROJECT,
    DELETE_PROJECT,
    ERROR_PROJECT,
} from '../../types';

const ProjectState = ({children}) => {

    const initialState = {
        projects:[],
        form: false,
        errorForm: false,
        project: null,
        msg: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch]=useReducer(projectReducer,initialState);

    // Serie de funciones para el CRUD.

    // Show form.
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    // Get projects.
    const getProjects = async () => {
        try {
            const response = await axiosClient.get('/api/projects')
            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'An error occurs when getting projects.',
                category: 'alerta alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }
    }

    // Add new project.
    const addProject = async project => {

        try {
            const response = await axiosClient.post('/api/projects/',project);
            // Insert the project with a dispatch.
            dispatch({
                type: ADD_PROJECTS,
                payload: response.data
            })
        } catch (error) {
            const alert = {
                msg: 'An error occurs when adding new project',
                category: 'alerta alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }}

    // Check form for erros.
    const showError = () => {
        dispatch({
            type: FORM_VALIDATION
        })
    }

    // Select clicked project.
    const actualProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }

    // Delete a project.
    const deleteProject = async projectId => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })            
        } catch (error) {
            const alert = {
                msg: 'An error occurs when deleting a project.',
                category: 'alerta alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                errorForm: state.errorForm,
                project:state.project,
                msg:state.msg,
                showForm,
                getProjects,
                addProject,
                showError,
                actualProject,
                deleteProject,
                
            }}
            
        >
            {children}
        </projectContext.Provider>
    )
}

export default ProjectState;