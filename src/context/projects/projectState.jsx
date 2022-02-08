import React, { useReducer } from 'react';
import { nanoid } from 'nanoid';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECTS,
    FORM_VALIDATION,
    ACTUAL_PROJECT,
    DELETE_PROJECT,
} from '../../types';

const ProjectState = ({children}) => {

    const projects = [
        {id:1, name: "tienda virtual"},
        {id:2, name: "intranet"},
        {id:3, name: "Diseño de sitio Web"},
        {id:4, name: "MERN"}
    ]

    const initialState = {
        projects:[],
        form: false,
        errorForm: false,
        project: null
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
    const getProjects = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects
        })
    }

    // Add new project.
    const addProject = project => {
        project.id = nanoid();
        // Insert the project with a dispatch.
        dispatch({
            type: ADD_PROJECTS,
            payload: project})
    }

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
    const deleteProject = projectId => {
        dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        })
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                errorForm: state.errorForm,
                project:state.project,
                showForm,
                getProjects,
                addProject,
                showError,
                actualProject,
                deleteProject
            }}
            
        >
            {children}
        </projectContext.Provider>
    )
}

export default ProjectState;