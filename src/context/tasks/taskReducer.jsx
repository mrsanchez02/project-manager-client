import {
    TASK_PROJECT,
    ADD_TASK,
    CHECK_TASK,
    DELETE_TASK,
    STATUS_TASK,
    ACTUAL_TASK,
    UPDATE_TASK,
    CLEAR_TASK,
} from '../../types';

const taskReducer = (state, action) => {
    switch (action.type) {
        case TASK_PROJECT:
            return {
                ...state,
                tasksProject: state.tasks.filter(task=> task.projectId ===action.payload)
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
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
                tasks: state.tasks.filter(task=>task.id!==action.payload)
            }
        case UPDATE_TASK:
        case STATUS_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task=>task.id===action.payload.id ? action.payload : task)
            }
        case ACTUAL_TASK: 
            return {
                ...state,
                taskSelected:action.payload
            }
        case CLEAR_TASK:
            return {
                ...state,
                taskSelected:null
            }
        default:
            return state;
    }
}

export default taskReducer