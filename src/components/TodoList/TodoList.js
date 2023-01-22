import React, { useState } from 'react'
import Header from './Header'
import Todo from './Todo'

export default function TodoList() {

    const [todos, setTodos] = useState([])
    const [todoTitle, settodoTitle] = useState('')
    const [status, setStatus] = useState('all')



    const todoTitleHandler = (event) => {
        settodoTitle(event.target.value)
    }


    const addToDo = (event) => {
        event.preventDefault()

        let newToDoObject = {
            id: todos.length + 1,
            title: todoTitle,
            completed: false

        }

        setTodos (prevState => {
            return [...prevState, newToDoObject]
        }) 

        settodoTitle('')
    }

    const removeTodo = (todoId) => {

        let newTodos = todos.filter(todo => {
            return todo.id !== todoId
        })

        setTodos(newTodos)
    }

   const editTodo = (todoId) => {

        let newTodos = [...todos]

        newTodos.forEach(todo => {
            if (todo.id === todoId){
                todo.completed = !todo.completed
            }
        })

       setTodos(newTodos)
    }

   const statusHandler = (event) => {
        setStatus(event.target.value)
    }


    return (
        <>
            <Header />
            <form onSubmit={addToDo}>
                <input type="text" className="todo-input" maxLength="40"
                    value={todoTitle} onChange={todoTitleHandler} />
                <button className="todo-button" type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
                <div className="select">
                    <select name="todos" className="filter-todo" onChange={statusHandler}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>

            <div className="todo-container">
                <ul className="todo-list">

                    {
                        status === 'completed' && todos.filter(todo => todo.completed).map(
                            todo => (
                                <Todo key={todo.id} {...todo} onRemove={removeTodo} onEdit={editTodo} />

                            ))
                    }

                    {
                       status === 'uncompleted' && todos.filter(todo => !todo.completed).map(
                            todo => (
                                <Todo key={todo.id} {...todo} onRemove={removeTodo} onEdit={editTodo} />

                            ))
                    }

                    {status === 'all' && todos.map(
                        todo => (
                            <Todo key={todo.id} {...todo} onRemove={removeTodo} onEdit={editTodo} />

                        ))
                    }


                </ul>
            </div>
        </>
    )

}
