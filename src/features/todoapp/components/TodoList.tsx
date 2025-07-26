'use client';

import { TodoItem } from '@/features/todoapp/components/TodoItem';
import { FormAction, FormState, Todo, TodoPriority, TodoTag } from '@/features/todoapp/type/todoTypes';
import React, { FormEvent, useCallback, useEffect, useReducer, useState } from 'react';

const initialReducerState: FormState = {
	title: '',
	description: '',
	priority: 'baja',
	completed: false,
	dueDate: '',
	tags: [],
};

const reducer = (state: FormState, action: FormAction): FormState => {
	switch (action.type) {
		case 'SET_TITLE':
			return { ...state, title: action.payload };
		case 'SET_DESCRIPTION':
			return { ...state, description: action.payload };
		case 'SET_PRIORITY':
			return { ...state, priority: action.payload };
		case 'SET_DUE_DATE':
			return { ...state, dueDate: action.payload };
		case 'SET_TAGS':
			return { ...state, tags: action.payload };
		case 'SET_COMPLETED':
			return { ...state, completed: action.payload };
		case 'RESET_FORM':
			return initialReducerState;
		default:
			return state;
	}
};

export const TodoList = () => {
	const [state, dispatch] = useReducer(reducer, initialReducerState);

	const [todos, setTodos] = useState<Todo[]>([]);
	const [tags, setTags] = useState<TodoTag[]>([]);
	const [isNewTag, setIsNewTag] = useState(false);
	const [newTagName, setNewTagName] = useState('');
	const [selectTag, setSelectTag] = useState('');

	useEffect(() => {
		// localStorage.setItem('todos', JSON.stringify(initialTodos))
		// localStorage.setItem('tags', JSON.stringify(todoTags))
		const localTodos: Todo[] = JSON.parse(localStorage.getItem('todos') ?? '[]');
		const localTags: TodoTag[] = JSON.parse(localStorage.getItem('tags') ?? '[]');

		setTodos(localTodos);
		setTags(localTags);
	}, []);

	const setTodosStorage = (newTodos: Todo[]) => {
		localStorage.setItem('todos', JSON.stringify(newTodos));
	};
	const setTagsStorage = (newTags: TodoTag[]) => {
		localStorage.setItem('tags', JSON.stringify(newTags));
	};

	const addTag = (tag: TodoTag) => {
		setTags((prev) => {
			const nTag = prev ? [...prev, tag] : [tag];
			setTagsStorage(nTag);
			return nTag;
		});
	};

	const handleCompletedTodo = useCallback((id: string) => {
		setTodos((prev) => {
			const nTodos = [
				...prev.map((t) => {
					return t.id === id ? { ...t, completed: !t.completed } : t;
				}),
			];
			setTodosStorage(nTodos);
			return nTodos;
		});
	}, []);

	const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const nTodo: Todo = {
			id: Date.now().toString(),
			title: state.title,
			completed: false,
			createdAt: Date.now().toString(),
			description: state.description,
			dueDate: state.dueDate,
			priority: state.priority,
			tags: state.tags,
		};
		setTodos((prev) => {
			const nTodos = [nTodo, ...prev];
			setTodosStorage(nTodos);
			return nTodos;
		});
	};

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-center'>Todo App</h1>
			<form className='w-md border rounded flex flex-col p-4 gap-4 mx-auto' onSubmit={handleAddTodo}>
				<div className='flex flex-col gap-2'>
					<label htmlFor='newTodoTitle'>Titulo:</label>
					<input
						className='border rounded py-1 px-2'
						type='text'
						id='newTodoTitle'
						value={state.title}
						onChange={(e) => {
							dispatch({ type: 'SET_TITLE', payload: e.target.value });
						}}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='newTodoDescription'>Descripción:</label>
					<textarea
						className='border rounded'
						rows={4}
						id='newTodoDescription'
						value={state.description}
						onChange={(e) => {
							dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value });
						}}
					/>
				</div>

				<div className='flex gap-4'>
					<div className='flex w-full items-center gap-2'>
						<label htmlFor='newTodoPriority'>Prioridad:</label>
						<select
							id='newTodoPriority'
							className='w-full border rounded py-[6.5px] px-2'
							value={state.priority}
							onChange={(e) => {
								dispatch({ type: 'SET_PRIORITY', payload: e.target.value as TodoPriority });
							}}
						>
							<option className='bg-black' value='baja'>
								Baja
							</option>
							<option className='bg-black' value='media'>
								Media
							</option>
							<option className='bg-black' value='alta'>
								Alta
							</option>
							<option className='bg-black' value='urgente'>
								Urgente
							</option>
						</select>
					</div>
					<div className='flex w-full items-center gap-2'>
						<label htmlFor='date'>Fecha:</label>
						<input
							type='date'
							id='date'
							className='w-full border rounded py-1 px-2'
							value={state.dueDate}
							onChange={(e) => {
								dispatch({ type: 'SET_DUE_DATE', payload: e.target.value });
							}}
						/>
					</div>
				</div>
				<div className='flex gap-4'>
					<div className='flex gap-2 items-center w-full'>
						<label htmlFor='newTodoTags'>Tags:</label>
						<select
							id='newTodoTags'
							className='w-full py-[6.5px] px-2 border rounded'
							value={selectTag}
							onChange={(e) => {
								if (e.target.value === '') return;

								const newTag = tags.find((t) => t.id === e.target.value);

								if (!newTag || state?.tags?.includes(newTag)) return;

								dispatch({ type: 'SET_TAGS', payload: [...state.tags, newTag] });
							}}
						>
							<option className='bg-black' defaultValue='' unselectable='on'></option>
							{tags &&
								tags.map((tag) => (
									<option className='bg-black' key={tag.id} value={tag.id}>
										{tag.name}
									</option>
								))}
						</select>
					</div>
					{isNewTag && (
						<input
							type='text'
							id='newTodoTag'
							placeholder='Tag'
							className='w-full border rounded py-1 px-2'
							value={newTagName}
							onChange={(e) => {
								setNewTagName(e.target.value);
							}}
						/>
					)}
					<button
						type='button'
						className={`border rounded-full  ${isNewTag ? 'px-[10px]' : 'px-3'} cursor-pointer`}
						onClick={() => {
							if (tags.some((t) => t.name === newTagName)) return;
							setIsNewTag((prev) => !prev);

							if (newTagName) {
								const newTag = {
									id: String(Date.now()),
									color: 'bg-red-900',
									name: newTagName,
								};

								dispatch({ type: 'SET_TAGS', payload: [...state.tags, newTag] });

								addTag(newTag);

								setNewTagName('');
							}
						}}
					>
						{isNewTag ? '✓' : '+'}
					</button>
				</div>
				<div className='flex flex-wrap gap-2'>
					{state?.tags &&
						state.tags.map((tag) => (
							<span key={tag.id} className={`${tag.color} rounded-full py-0.5 px-2`}>
								{tag.name}
							</span>
						))}
				</div>
				<button className='border rounded py-1 px-4 cursor-pointer'>Crear Tarea</button>
			</form>
			<div className='max-w-lg mx-auto flex flex-col gap-4 w-full'>
				<h2 className='text-center'>Lista de Tareas</h2>
				<ul className='flex flex-col gap-4'>
					{todos && todos.map((t) => <TodoItem key={t.id} todo={t} handleCompleted={handleCompletedTodo} />)}
				</ul>
			</div>
		</div>
	);
};

