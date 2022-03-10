import React,{useReducer} from 'react';
import authContext from './authContext';
import authReducer from './authReducer'
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'

import {
    SUCCESSFUL_REGISTRATION,
    ERROR_REGISTRATION,
    GET_USER,
    SUCCESSFUL_LOGIN,
    ERROR_LOGIN,
    LOG_OUT
} from '../../types'

const AuthState = ({children}) => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        msg: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    //fn
    const userRegistration = async data => {
        try {
            const response = await axiosClient.post('/api/users',data);
            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data
            })
            // Get the user.
            authenticatedUser();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: ERROR_REGISTRATION,
                payload: alert
            })
        }
    }

    // Get user authenticated.
    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const response = await axiosClient.get('/api/auth')
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {
            dispatch({
                type: ERROR_LOGIN
            })

        }
        
    }

    // user Login
    const userLogin = async (data) => {
        try {
            const response = await axiosClient.post('/api/auth',data)
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data
            });
            //Get user.
            authenticatedUser();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            })
        }
    }

    // user Logout
    const userLogout = () => {
        dispatch({type: LOG_OUT})
    }


    return(
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user:state.user,
                msg:state.msg,
                loading: state.loading,
                userRegistration,
                authenticatedUser,
                userLogin,
                userLogout
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;