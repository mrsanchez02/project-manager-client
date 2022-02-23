import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/autentication/authState';
import tokenAuth from './config/tokenAuth';
import ProtectedRoutes from './components/routes/ProtectedRoutes';

// Check if token exist.
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  
  return (
    
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Routes>
                <Route exact path='/' element={<Login />}/>
                <Route element={<ProtectedRoutes/>} >
                  <Route exact path='/projects' element={<Projects />}/>
                </Route>
                <Route exact path='/new-account' element={<NewAccount/>}/>
              </Routes>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
    
  );
}

export default App;
