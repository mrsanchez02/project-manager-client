import React, { useContext,  } from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const TaskList = () => {

  // Extract projects from state.
  const projectsContext = useContext(projectContext);
  const { project,deleteProject } = projectsContext;

  // Extract tasks from state.
  const tasksContext = useContext(taskContext);
  const { tasksProject } = tasksContext;

  // if no projects selected...
  if(!project) return <h2>Select a project.</h2>

  // Array Destructuring in order to extract the actual project.
  const [actualProject] = project;

  // Delete a project.
  const onClickDelete = () => {
    deleteProject(actualProject._id)
  }

  return (
    <>
      <h2>Project: {actualProject.name}</h2>
      <ul className='listado-tareas'>
        {tasksProject.length  === 0 
          ? (<li className='tarea'><p>There's no tasks. </p></li>)
          : 
          <TransitionGroup>
            {tasksProject.map(task =>(
              <CSSTransition 
                key={task._id}
                timeout={200}
                classNames="tarea"
              >
                <Task task={task}/>
              </CSSTransition>
            ))}
          </TransitionGroup>
        }
      </ul>
      <button
        type='button'
        className='btn btn-eliminar'
        onClick={onClickDelete}
      >Delete Project &times;</button>
    </>
  )
}

export default TaskList
