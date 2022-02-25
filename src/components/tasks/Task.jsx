import React, { useContext } from 'react'
import projectContext from '../../context/projects/projectContext';
import taskContext from "../../context/tasks/taskContext";

const Task = ({task}) => {
  
  // Get project state.
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  const tasksContext = useContext(taskContext);
  const { deleteTask, getTasks, updateTask, saveActualTask } = tasksContext;

  // Extract the project.
  const [actualProject]=project;

  // Delete fn to delete task.
  const taskDelete = id => {
    deleteTask(id,actualProject._id)
    getTasks(actualProject._id);
  }

  // FN Switch task status.
  const changeStatus = task => {
    if(task.status){
      task.status = false;
    } else {
      task.status = true;
    }
    updateTask(task);
  }

  // Add the actual task when user needs to edit.
  const selectTask = task => {
    saveActualTask(task);
  }

  return (
    <li key={task.id} className='tarea sombra'>
      <p>{task.name}</p>
      <div className="estado">
        {task.status 
        ?
          (
            <button
              type='button'
              className='completo'
              onClick={()=>changeStatus(task)}
            >Completo</button>
          )
        :
          (
            <button
                type='button'
                className='incompleto'
                onClick={()=>changeStatus(task)}
            >Incompleto</button>
          )
        }
      </div>
      <div className="acciones">
        <button
          type='button'
          className='btn btn-primario'
          onClick={()=>selectTask(task)}
        >Editar</button>
        <button
          type='button'
          className='btn btn-secundario'
          onClick={()=>taskDelete(task._id)}
        >Eliminar</button>
      </div>
    </li>
  )
}

export default Task