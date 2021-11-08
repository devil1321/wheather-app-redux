import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThList } from '@fortawesome/free-solid-svg-icons'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'
import { todoActions } from '../APIControllers/actions/todoActions'



const TodoItem = (props) =>{
    const { task, completed,description } = props.task
    const [isMenu,setIsMenu] = useState(false)
    const { handleEdit, handleRemove,setCompleted } = props
    return(
        <li className="todo__item">
            <div className="todo__item-task">
                {completed 
                    ? <FontAwesomeIcon icon={faCheckDouble} />
                    : <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11 list__item-pending" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                }
                {task}
            </div>
            <FontAwesomeIcon icon={faThList} onClick={()=>setIsMenu(!isMenu)}/>
            {isMenu && <div className="todo__item-menu">
                {completed 
                    ? <div className="todo__item-field"
                        onClick={()=>{
                            setCompleted(task)
                            setIsMenu(!isMenu)
                        }}> 
                        <FontAwesomeIcon icon={faCheckDouble} />
                        Uncompleted  
                      </div>
                    : <div className="todo__item-field" 
                    onClick={()=>{
                            setCompleted(task)
                            setIsMenu(!isMenu)
                        }}> 
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11 list__item-pending" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                        Completed
                      </div>
                }
                <div className="todo__item-field" 
                onClick={()=>{
                    handleEdit(task,description)
                    setIsMenu(!isMenu)}}>
                    <FontAwesomeIcon icon = {faPencilAlt} />
                    Description
                </div>
                <div className="todo__item-field" 
                onClick={()=>{
                    handleRemove(task)
                    setIsMenu(!isMenu)
                }}>
                    <FontAwesomeIcon icon = {faTrash} />
                    Remove
                </div>
            </div>}
        </li>
    )
}


const Tasks = (props) => {
    const { todos, todo, description } = props
    const [todoVal,setTodoVal] = useState('')
    const { handleAddTodo, handleEdit, handleSaveDesc,setDescription,clearTodo } = props

    return (
        <div className="todo">
            <div className="todo__list-wrapper">
                <div className="todo__list-heading">
                    <h1>Your Tasks</h1>
                    <div className="todo__heading-field">
                        <input type="text" value={todoVal} onChange={(e)=>{setTodoVal(e.target.value)}}/>
                        <button onClick={()=>{
                            if(todoVal !== ''){
                                handleAddTodo(todoVal) 
                                setTodoVal('')
                        }}}>Add Task</button>
                    </div>
                </div>
                <ul className="todo__list">
                    {todos.map((todo,index) => <TodoItem key={index} id={index} task={todo} {...props} />)}
                </ul>
                <button className="todo__btn-clear" onClick={()=>{clearTodo()}}>Clear List</button>
            </div>
            <div className="todo__desc">
                <div className="todo__desc-heading">
                    <h2>Description</h2>
                    <h3>{todo}</h3>
                    <textarea 
                        placeholder="Todo description..." 
                        cols={58} rows={15} 
                        className="todo__desc-text"
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                    />
                    <button className="todo__btn-save" onClick={()=>{handleSaveDesc(todo,description)}}>Save Description</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>({
    ...state.todos
})

export default connect(mapStateToProps,todoActions)(Tasks)
