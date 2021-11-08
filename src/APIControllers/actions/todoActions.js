import { SET_TODO, SET_DESCRIPTION, SET_COMPLETED, ADD_TODO, EDIT_TODO, SAVE_TODO, REMOVE_TODO, CLEAR_TODO } from './types'
import store from '../store'

const handleAddTodo = (todo) => dispatch => {
    let tempTodos = store.getState().todos.todos
    const task = {
        task: todo,
        description: '',
        completed: false
    }
    tempTodos.push(task)
    dispatch({
        type: ADD_TODO,
        payload: tempTodos
    })
}

const setDescription = (description) => dispatch => {
    dispatch({
        type: SET_DESCRIPTION,
        payload: description
    })
}

const handleEdit = (todo, description) => dispatch => {
    dispatch({
        type: SET_TODO,
        payload: todo,
    })
    dispatch({
        type: EDIT_TODO,
        payload: description
    })
}

const handleSaveDesc = (task, description) => dispatch => {
    let tempTodos = store.getState().todos.todos
    const oldTodo = tempTodos.find(todo => todo.task === task)
    const index = tempTodos.indexOf(oldTodo)
    tempTodos[index].description = description
    console.log(tempTodos)
    dispatch({
        type: SAVE_TODO,
        payload: tempTodos,
        description: '',
        todo: ''
    })
}
const setCompleted = (task) => dispatch => {
    let tempTodos = store.getState().todos.todos
    const oldTodo = tempTodos.find(todo => todo.task === task)
    const index = tempTodos.indexOf(oldTodo)
    if (tempTodos[index].completed === false) {
        tempTodos[index].completed = true
    } else {
        tempTodos[index].completed = false
    }
    dispatch({
        type: SET_COMPLETED,
        payload: tempTodos
    })
}

const handleRemove = (task) => dispatch => {
    let tempTodos = store.getState().todos.todos
    tempTodos = tempTodos.filter(todo => todo.task !== task)
    dispatch({
        type: REMOVE_TODO,
        payload: tempTodos
    })
    dispatch({
        type: SET_DESCRIPTION,
        payload: ''
    })
}

const clearTodo = () => dispatch => {
    dispatch({
        type: CLEAR_TODO,
        payload: []
    })
}

export const todoActions = {
    setCompleted,
    setDescription,
    handleAddTodo,
    handleEdit,
    handleSaveDesc,
    handleRemove,
    clearTodo
}