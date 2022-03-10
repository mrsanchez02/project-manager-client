import React, { useContext, useEffect, useState } from 'react'
import projectContext from '../../context/projects/projectContext';
import taskContext from "../../context/tasks/taskContext";

const FormTask = () => {

  // Extract projects from initialState
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  // Get Task's functions
  const tasksContext = useContext(taskContext);
  const { taskSelected, addTask, errorTask, verifyTask, getTasks, updateTask,clearTask } = tasksContext;

  // Effect detects if there's a selected task.
  useEffect(()=>{
    if(taskSelected!==null){
      setTask(taskSelected)
    } else {
      setTask({
        name:''
      })
    }
  },[taskSelected])

  //Form state.
  const [task,setTask]=useState({
    name:''
  })

  // Extract task name.
  const { name } = task;
  
  // if no projects selected...
  if(!project) return null;

  // Array Destructuring in order to extract the actual project.
  const [ actualProject ] = project;

  // Read values from form.
  const handleChange = e => {
    setTask({
      ...task,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    // verify
    if(name.trim()===''){
      verifyTask()
      return
    }

    // Check if edit or new task

    if(taskSelected===null){
      // add new task to the Task's state.
      task.project = actualProject._id;
      addTask(task);
    } else {
      // update existing task.
      updateTask(task);

      // Clear selecte task from state.
      clearTask();
    }

    //Obtener y filtrar las tareas del projecto actual.
    getTasks(actualProject._id);

    //Reset form
    setTask({
      name:''
    })

  }

  return (
    <div className='formulario'>
      <form
        onSubmit={handleSubmit}
      >
          <div className="contenedor-input">
                <input 
                    type="text"
                    className='input-text'
                    placeholder='Task name...'
                    name='name'
                    onChange={handleChange}
                    value={name}
                />
          </div>
          <div className="contenedor-input">
            <input 
              type="submit"
              className='btn btn-primario btn-submit btn-block'
              value={taskSelected ? "Edit task":"Add task"}
            />
          </div>
      </form>
      {errorTask? <p className='mensaje error'>Task name required!</p>:null}
    </div>
  )
}

export default FormTask
