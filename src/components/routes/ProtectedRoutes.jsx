import React,{useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import authContext from '../../context/autentication/authContext';
import Login from '../auth/Login';

const ProtectedRoutes = () => {

    const AuthContext = useContext(authContext);
    const { authenticated, authenticatedUser,loading } = AuthContext; 

    useEffect(() => {
        authenticatedUser();
    // eslint-disable-next-line
    }, [])
    

    return !authenticated&&!loading ? <Login /> : <Outlet />
}

export default ProtectedRoutes
