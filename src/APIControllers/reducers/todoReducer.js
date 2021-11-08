import { SET_TODO, SET_DESCRIPTION, SET_COMPLETED, ADD_TODO, EDIT_TODO, SAVE_TODO, REMOVE_TODO, CLEAR_TODO } from '../actions/types'
const initState = {
    todos: [{
            task: 'Walk Dog',
            completed: false,
            description: 'ss'
        },
        {
            task: 'Go Shopping',
            completed: false,
            description: ''
        },
        {
            task: 'Go To Work',
            completed: false,
            description: ''
        }
    ],
    todo: '',
    description: ''
}

export default (state = initState, action) => {
    switch (action.type) {
        case SET_TODO:
            return {
                ...state,
                todo: action.payload
            }
        case SET_COMPLETED:
            return {
                ...state
            }
        case SET_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            }
        case ADD_TODO:
            return {
                ...state,
                todos: action.payload
            }

        case EDIT_TODO:
            return {
                ...state,
                description: action.payload
            }
        case SAVE_TODO:
            return {
                ...state,
                todos: action.payload,
                description: action.description,
                todo: action.todo
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: action.payload
            }
        case CLEAR_TODO:
            return {
                ...state,
                todos: action.payload
            }
        default:
            return {
                ...state
            }
    }
}