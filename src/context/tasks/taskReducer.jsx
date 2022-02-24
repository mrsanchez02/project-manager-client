import {
    TASK_PROJECT,
    ADD_TASK,
    CHECK_TASK,
    DELETE_TASK,
    ACTUAL_TASK,
    UPDATE_TASK,
    CLEAR_TASK,
} from '../../types';

const taskReducer = (state, action) => {
    switch (action.type) {
        case TASK_PROJECT:
            return {
                ...state,
                tasksProject: action.payload
            };
        case ADD_TASK:
            return {
                ...state,
                tasksProject: [action.payload, ...state.tasksProject],
                errorTask:false
            };
        case CHECK_TASK:
            return {
                ...state,
                errorTask:true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.filter(task=>task._id!==action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.map(task=>task._id===action.payload._id ? action.payload : task)
            }
        case ACTUAL_TASK: 
            return {
                ...state,
                taskSelected:action.payload
            }
        case CLEAR_TASK:
            return {
                ...state,
                tasksProject:null
            }
        default:
            return state;
    }
}

export default taskReducer