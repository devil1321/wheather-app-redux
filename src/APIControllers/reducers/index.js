import { combineReducers } from "redux";
import wheatherReducer from '../reducers/wheatherReducer'
import imagesReducer from '../reducers/imagesReducer'
import todoReducer from '../reducers/todoReducer'

export default combineReducers({
    wheatherDATA: wheatherReducer,
    images: imagesReducer,
    todos: todoReducer
})