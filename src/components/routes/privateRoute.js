import React,{useContext, useEffect} from 'react'
import { Route, Navigate } from 'react-router-dom';
import authContext from '../../context/autentication/authContext';

const PrivateRoute = ({component: Component, ...props}) => {

    const AuthContext = useContext(authContext);
    const { authenticated } = AuthContext; 

  return (
  <Route {...props} element={ !authenticated ? (
            <Navigate to='/' />
        ) : (
            <Component {...props} />
        )} />
        )
}

export default PrivateRoute;