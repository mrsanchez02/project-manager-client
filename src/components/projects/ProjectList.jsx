import React,{useContext, useEffect} from 'react'
import Project from './Project'
import projectContext from '../../context/projects/projectContext';
import alertContext from '../../context/alerts/alertContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ProjectList = () => {

  // Extract projects from initalState
  // const projectStates = useContext(projectContext);
  // const { msg, projects,getProjects } = projectStates;
  const ProjectContext = useContext(projectContext);
  const { msg, projects,getProjects } = ProjectContext;

  const AlertContext = useContext(alertContext);
  const { alert, showAlert } = AlertContext;
  
  // Get projects when component load.
  useEffect(() => {
    
    if(msg){
      showAlert(msg.msg, msg.category);
    }
    getProjects();

  }, [msg]);

  // Check if projects has content.
  if (projects.length===0) return <p>No hay projectos, comienza creando uno!</p>;

  return (
    <ul className='listado-proyectos'>

      { alert ? ( <div className={`alerta ${alert.category}`}> {alert.msg} </div> ) : null }

      <TransitionGroup>
      {projects.map(project=> (
        <CSSTransition 
          key={project._id}
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

