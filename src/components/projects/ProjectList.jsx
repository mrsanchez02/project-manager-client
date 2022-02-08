import React,{useContext, useEffect} from 'react'
import Project from './Project'
import projectContext from '../../context/projects/projectContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ProjectList = () => {

  // Extract projects from initalState
  const projectStates = useContext(projectContext);
  const { projects,getProjects } = projectStates;

  // Get projects when component load.
  useEffect(() => {
    getProjects();
    // eslint-disable-next-line
  }, []);

  // Check if projects has content.
  if (projects.length===0) return <p>No hay projectos, comienza creando uno!</p>;

  return (
    <ul className='listado-proyectos'>
      <TransitionGroup>
      {projects.map(project=> (
        <CSSTransition 
          key={project.id}
          timeout={200}
          classNames="proyecto"
        >
          <Project
            project={project}
          />
        </CSSTransition>
      ))}
      </TransitionGroup>
    </ul>
  )
}

export default ProjectList

