import './todo.css'
import TodoData from './TodoData'
import TodoNew from './TodoNew'
import reactLogo from '../../assets/react.svg'
import { useState } from 'react'

const TodoApp = () => {
    const [todoList, setTodoList] = useState([])

    // Khởi tạo 1 func
    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 100000),
            name: name
        }
        setTodoList([...todoList, newTodo])
    }

    const deleteTodo = (id) => {
        const result = todoList.filter(item => item.id !== id)
        setTodoList(result)
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew
                addNewTodo={addNewTodo}
            />

            {todoList.length > 0 ?
                <TodoData todoList={todoList} deleteTodo={deleteTodo} />
                :
                <div className='todo-image'>
                    <img src={reactLogo} className='logo'></img>
                </div>
            }
        </div>
    );
}

export default TodoApp