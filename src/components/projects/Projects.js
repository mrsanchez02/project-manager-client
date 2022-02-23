import React, { useContext, useEffect } from 'react'
import Sidebar from '../layout/Sidebar'
import Upperbar from '../layout/Upperbar'
import FormTask from '../tasks/FormTask'
import TaskList from '../tasks/TaskList'
import authContext from '../../context/autentication/authContext'

const Projects = () => {

  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;

  useEffect(() => {
    authenticatedUser()
  }, [])
  

  return (
    <div className='contenedor-app'>
        <Sidebar />
        <div className="seccion-principal">
            <Upperbar/>
            <main>
                  <FormTask/>
                  <div className="contenedor-tareas">
                    <TaskList />
                  </div>
            </main>
        </div>
    </div>
  )
}

export default Projects
