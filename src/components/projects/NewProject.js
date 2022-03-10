import React, { useContext, useState } from 'react'
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    //Obtener el state del formulario.
    const projectsContext = useContext(projectContext);
    const { form, errorForm, showForm, addProject,showError } = projectsContext;

    // state for project.
    const [ project, setProject ] = useState({
        name:''
    });

    //  Destructuring project.
    const { name } = project;

    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validating: No empty fields.
        if(name.trim()===''){
            showError();
            return;
        }

        // add to state.
        addProject(project);
        
        // Reset form.
        setProject({
            name:''
        })

    }

    // Show Form
    const handleNewProjectClick = () => {
        showForm();
    }

  return (
    <>
        <button
            type='button'
            className='btn btn-block btn-primario'
            onClick={handleNewProjectClick}
        >New Project</button>

        {form
        ?
        <form
            className='formulario-nuevo-proyecto'
            onSubmit={handleSubmit}
        >
            <input
                type='text'
                className='input-text'
                placeholder='Project name'
                name='name'
                onChange={handleChange}
                value={name}
            />
            <input 
                type='submit' 
                className='btn btn-primario btn-block' 
                value='Add project'/>
        </form>
        :
        null
        }
        {errorForm ? <p className="mensaje error">Project name is required</p> : null}
    </>
  )
}

export default NewProject
