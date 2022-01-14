import React from 'react'

const Todo = ({ text, todos, todo, setTodos }) => {
	//THE FOLLOWING TWO FUNCTIONS ARE FOR MANAGING DELETE AND COMPLETE-INCOMPLETE
	const deleteHandler = () => {
		setTodos(todos.filter((el) => el.id !== todo.id))
	}

	const completeHandler = () => {
		setTodos(
			todos.map((el) => {
				if (el.id === todo.id) return { ...el, completed: !el.completed }
				return el
			})
		)
	}

	return (
		<div className={todo.completed ? 'todo-box completed-todo' : 'todo-box'}>
			<li className={todo.completed ? 'todo-item completed-li' : 'todo-item'}>
				{text}
			</li>
			<div className='todo-buttons'>
				<button
					onClick={completeHandler}
					className={todo.completed ? 'complete-btn' : 'uncomplete-btn'}>
					<i className='fas fa-check'></i>
				</button>
				<button onClick={deleteHandler} className='trash-btn'>
					<i className='fas fa-trash'></i>
				</button>
			</div>
		</div>
	)
}

export default Todo
