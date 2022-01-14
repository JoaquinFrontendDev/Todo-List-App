import React, { useEffect } from 'react'
import swal from 'sweetalert'

const Form = ({
	setInputText,
	inputText,
	todos,
	setTodos,
	setStatus,
	backUpTodos,
	setBackUpTodos,
}) => {
	const inputTextHandler = (e) => {
		setInputText(e.target.value)
	}

	//UP THERE AND HERE WE TAKE INPUT TEXT VALUE, AND START BUILDING TODO'S ARRAY
	const submitTodoHandler = (e) => {
		e.preventDefault()
		if (inputText !== '') {
			setTodos([
				...todos,
				{
					text: inputText,
					completed: false,
					id: Math.floor(Math.random() * 100000),
				},
			])
			setInputText('')
		} else showAlert()
	}

	//THE FOLLOWING FUNCTIONS ARE FOR HANDLE STATUS (COMPLETED - INCOMPLETED) AND THE CLEAR BUTTON

	const statusHandler = (e) => {
		setStatus(e.target.value)
	}

	const handleClear = (e) => {
		e.preventDefault()
		showDeleteAlert()
	}

	const showAlert = () => {
		swal({
			title: 'Importante!',
			text: 'Debes introducir algún texto',
			icon: 'warning',
			buttons: 'Aceptar',
		})
	}

	const showDeleteAlert = () => {
		swal({
			title: 'Cuidado!',
			text: 'Estas a punto de borrar todas tus tareas, estás seguro que deseas hacerlo?',
			icon: 'warning',
			buttons: ['Declinar', 'Aceptar'],
		}).then((respuesta) => {
			if (respuesta) {
				return (
					swal({
						text: 'Todas las tareas fueron eliminadas exitosamente',
						icon: 'success',
						// eslint-disable-next-line no-sequences
					}),
					setBackUpTodos(todos),
					setTodos([])
				)
			}
		})
	}

	//WE MAKE DYNAMIC BACKUP IN CASE WE WANT TO GET BACK INFO WE CLEARED

	const getBackUpTodos = (e) => {
		e.preventDefault()
		if (localStorage.getItem('backUpTodos') === null) {
			localStorage.setItem('backUpTodos', JSON.stringify([]))
		} else {
			let backUpTodos = JSON.parse(localStorage.getItem('backUpTodos'))
			setTodos(backUpTodos)
		}
	}

	useEffect(() => {
		setBackUpTodos(todos)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todos])

	//AND FINALLY WE RETURN A FORM

	return (
		<div className='main-container'>
			<header className='main-header'>
				<h1>Task Time</h1>
			</header>
			<form className='form-container'>
				<div className='text-input'>
					<input
						value={inputText}
						placeholder='Type something...'
						onChange={inputTextHandler}
						type='text'
						className='todo-input'
						maxLength='30'
					/>
					<button
						onClick={submitTodoHandler}
						type='submit'
						className='todo-button'>
						<i className='fas fa-plus'></i>
					</button>
				</div>

				<div className='filter-select'>
					<select onChange={statusHandler} className='todos filter-todo'>
						<option value='all'>All</option>
						<option value='completed'>Completed</option>
						<option value='uncompleted'>Uncompleted</option>
					</select>
				</div>
				<div className='clear-undo'>
					<div className='clear-all'>
						<label>Clear All</label>
						<button
							onClick={handleClear}
							type='submit'
							className='button-cu clear'>
							<i className='fas fa-times'></i>
						</button>
					</div>
					<div className='back-up'>
						<label>Undo</label>
						<button
							onClick={getBackUpTodos}
							type='submit'
							className='button-cu clear'>
							<i className='fas fa-undo'></i>
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Form
