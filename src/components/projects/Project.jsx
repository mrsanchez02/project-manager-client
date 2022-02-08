import React, { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const Project = ({ project }) => {

  // Get project state.
  const projectsContext = useContext(projectContext);
  const { actualProject } = projectsContext;

  // Get Task's functions
  const tasksContext = useContext(taskContext);
  const { getTasks } = tasksContext;

  
  const selectProject = (id) => {
    actualProject(id); //Set the actualProject
    getTasks(id); //Filter tasks by project when clicked.
  };

  return (
    <li key={project.id}>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => selectProject(project.id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
