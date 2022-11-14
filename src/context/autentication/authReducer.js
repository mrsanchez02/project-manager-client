import {
    SUCCESSFUL_REGISTRATION,
    ERROR_REGISTRATION,
    GET_USER,
    SUCCESSFUL_LOGIN,
    ERROR_LOGIN,
    LOG_OUT,
    LOADING
} from '../../types'


const authReducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return {
                loading: action.payload
            }
        case SUCCESSFUL_LOGIN:
        case SUCCESSFUL_REGISTRATION:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                authenticated: true,
                msg:null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }
        case LOG_OUT:
        case ERROR_LOGIN:
        case ERROR_REGISTRATION:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                user:null,
                authenticated: null,
                msg: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default authReducer;