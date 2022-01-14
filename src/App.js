import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './Components/Form'
import TodoList from './Components/TodoList'

function App() {
	//ALL THE STATES GO HERE, ON THE TOP FOR AN EASY READING
	const [inputText, setInputText] = useState('')
	const [todos, setTodos] = useState([])
	const [status, setStatus] = useState('All')
	const [filteredTodos, setFilteredTodos] = useState([])
	const [backUpTodos, setBackUpTodos] = useState([])

	//SINCE THIS IS A LITTLE PERSONAL TRAINING, I DIDN'T USE DATABASE, SO I STORE ALL IN LOCALSTORAGE
	//SO WITH USE EFFECT WE RECOVER EVERYTHING IF WE CLOSE THE APP OR REFRESH

	useEffect(() => {
		getLocalTodos()
	}, [])

	useEffect(() => {
		filterHandler()
		saveLocalTodos()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todos, status])

	const saveLocalTodos = () => {
		localStorage.setItem('todos', JSON.stringify(todos))
		localStorage.setItem('backUpTodos', JSON.stringify(backUpTodos))
	}

	const getLocalTodos = () => {
		if (localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify([]))
		} else {
			let localTodos = JSON.parse(localStorage.getItem('todos'))
			setTodos(localTodos)
		}
	}

	//THIS SWITCH-CASE IS ORIENTED FOR MANAGING TODO'S STATUS, AND ENABLE FILTERING

	const filterHandler = () => {
		switch (status) {
			case 'completed':
				setFilteredTodos(todos.filter((todo) => todo.completed))
				break
			case 'uncompleted':
				setFilteredTodos(todos.filter((todo) => !todo.completed))
				break
			default:
				setFilteredTodos(todos)
				break
		}
	}

	return (
		<div className='App'>
			<Form
				todos={todos}
				setTodos={setTodos}
				inputText={inputText}
				setInputText={setInputText}
				setStatus={setStatus}
				backupTodos={backUpTodos}
				setBackUpTodos={setBackUpTodos}
			/>
			<TodoList
				todos={todos}
				setTodos={setTodos}
				filteredTodos={filteredTodos}
			/>
		</div>
	)
}

export default App
