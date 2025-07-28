'use client';

import { useFeatureContext } from '@/context/featureContext';
import { TodoItem } from '@/features/todoapp/components/TodoItem';
import { Todo, TodoPriority, TodoTag } from '@/features/todoapp/type/todoTypes';
import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { initialTodos, todoTags } from '../data/data';
import { TodoCreator } from './TodoCreator';
import { TodoDetail } from './TodoDetails';

export const TodoList = () => {
	// const [todos, setTodos] = useState<Todo[]>([]);
	// const [tags, setTags] = useState<TodoTag[]>([]);
	// const [isNewTag, setIsNewTag] = useState(false);
	// const [newTagName, setNewTagName] = useState('');
	// const [selectTag, setSelectTag] = useState('');
	// const { state, dispatch } = useFeatureContext();
	// const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

	// const detailsRef = useRef<HTMLDivElement | null>(null);

	// useEffect(() => {
	// 	const handleClickOutside = (e: Event) => {
	// 		const target = e.target as HTMLElement;

	// 		const clickedInsideDetails = detailsRef.current && detailsRef.current.contains(target);
	// 		const clickedInsideItem = target && !!target.closest('.todo-item');

	// 		if (!clickedInsideDetails && !clickedInsideItem) {
	// 			dispatch({ type: 'TODO_VIEW', payload: false });
	// 		}
	// 	};

	// 	document.addEventListener('click', handleClickOutside);

	// 	return () => document.removeEventListener('click', handleClickOutside);
	// }, [state.ui.isTodoView]);

	// const handleToggleTodo = useCallback((id: string) => {
	// 	dispatch({ type: 'TOGGLE_TODO', payload: id });
	// 	// dispatch({ type: 'TODO_VIEW', payload: false });
	// }, []);

	// const handleOpenDetails = useCallback(
	//   (e: MouseEvent<HTMLDivElement>, todo: Todo) => {
	//     console.log("hola")
	// 		if ((e.target as HTMLElement).closest('.todo-item-check')) return;
	// 		if (todo.id === state.selectedTodo?.id) {
	// 		// setSelectedTodo(null);
	// 		// dispatch({ type: 'TODO_VIEW', payload: !state.ui.isTodoView });
	//     dispatch({ type: 'SELECTED_TODO', payload: todo });
	// 		} else {
	// 		// setSelectedTodo(todo);
	// 		dispatch({ type: 'SELECTED_TODO', payload: todo });
	// 		// dispatch({ type: 'TODO_VIEW', payload: !state.ui.isTodoView });
	// 		}
	// 	},
	// 	// [state.ui.isTodoView]
	// 	[state.selectedTodo, state.ui.isTodoView]
	// );

	const { state, dispatch } = useFeatureContext();
	// const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
	// const [isOpenDetails, setIsOpenDetails] = useState(false);

	const handleToggleTodo = useCallback((id: string) => {
		dispatch({ type: 'TOGGLE_TODO', payload: id });
		// dispatch({ type: 'TODO_VIEW', payload: false });
	}, []);

	// const handleOpenDetails = useCallback(
	// 	(open: boolean) => {
	// 		// (e: MouseEvent<HTMLDivElement>, todo: Todo) => {
	// 		console.log('handleOpenDetails');
	// 		setIsOpenDetails(open);
	// 		// if ((e.target as HTMLElement).closest('.todo-item-check')) return;
	// 		// if (todo.id === selectedTodo?.id) {
	// 		// setSelectedTodo(null);
	// 		// dispatch({ type: 'TODO_VIEW', payload: !state.ui.isTodoView });
	// 		// dispatch({ type: 'SELECTED_TODO', payload: todo });
	// 		// } else {
	// 		// dispatch({ type: 'SELECTED_TODO', payload: todo });
	// 		// dispatch({ type: 'TODO_VIEW', payload: !state.ui.isTodoView });
	// 		// }
	// 	},
	// 	// [state.ui.isTodoView]
	// 	[]
	// );

	const detailsRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (e: Event) => {
			const target = e.target as HTMLElement;

			const clickedInsideDetails = detailsRef.current && detailsRef.current.contains(target);
			const clickedInsideItem = target && !!target.closest('.todo-item');

			if (!clickedInsideDetails && !clickedInsideItem) {
				// handleOpenDetails(false);
				// setIsOpenDetails(false);
				dispatch({ type: 'TODO_VIEW', payload: false });
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => document.removeEventListener('click', handleClickOutside);
	}, []);

	// const handleTodoClick = useCallback(
	// 	(todo: Todo, e: MouseEvent<HTMLDivElement>) => {
	// 		if ((e.target as HTMLElement).closest('.todo-item-check')) return;

	// 		// if (state.selectedTodo?.id === todo.id) {
	// 			// dispatch({ type: 'TODO_VIEW', payload: !state.ui.isTodoView });
	// 		// } else {
	// 			// dispatch({ type: 'SELECTED_TODO', payload: todo });
	// 			// dispatch({ type: 'TODO_VIEW', payload: true });
	// 		// }

	// 		// setSelectedTodo((prevTodo) => {
	// 		// 	if (prevTodo?.id === todo.id) {
	// 		// 		setIsOpenDetails((prevOpen) => {
	// 		// 			return !prevOpen;
	// 		// 		});
	// 		// 		return prevTodo;
	// 		// 	} else {
	// 		// 		setIsOpenDetails(true);
	// 		// 		return todo;
	// 		// 	}
	//     // });
	//     dispatch((getState) => {
	// 			const currentState = getState();
	// 			const isSameTodo = currentState.selectedTodo?.id === todo.id;
	// 			const isOpen = currentState.ui.isTodoView;

	// 			// Batch de dispatches
	// 			if (!isSameTodo) {
	// 				dispatch({ type: 'SELECTED_TODO', payload: todo });
	// 			}

	// 			const shouldOpen = !(isSameTodo && isOpen);
	// 			if (shouldOpen !== isOpen) {
	// 				dispatch({ type: 'TODO_VIEW', payload: shouldOpen });
	// 			}
	// 		});
	// 	},
	// 	[]
	// );

	const selectedIdRef = useRef(state.selectedTodo?.id);
	const viewOpenRef = useRef(state.ui.isTodoView);

	selectedIdRef.current = state.selectedTodo?.id;
	viewOpenRef.current = state.ui.isTodoView;

	// Si alguien ve esto raro, si, lo es, no encontre otra forma de actualizar tanto la view sin perder el todo seleccionado y al mismo tiempo animar todo y que no se vuelva a renderizar toda la lista al añadir las dependencias en el handleTodoClick. Podria unir los reducers, seria lo mas facil, pero mezclaria la ui con la parte de todo, no creo sea la mejor idea, podria dejar que se re renderice todo, pero no lo considero buena practica, podria hacer que todo dependa de si hay o no todo seleccionado, pero eso haria que la animacion quede fea y sobre todo el problema es lograr el comportamiento de abrir cerrar la vista de detalles con el stado inverso, si tienes una mejor solucion con gusto la escuchare :)

	const handleTodoClick = useCallback((todo: Todo, e: MouseEvent<HTMLDivElement>) => {
		if ((e.target as HTMLElement).closest('.todo-item-check')) return;

		const isSameTodo = selectedIdRef.current === todo.id;
		const isOpen = viewOpenRef.current;

		if (!isSameTodo) {
			dispatch({ type: 'SELECTED_TODO', payload: todo });
			if (!isOpen) {
				dispatch({ type: 'TODO_VIEW', payload: true });
			}
		} else {
			dispatch({ type: 'TODO_VIEW', payload: !isOpen });
		}
	}, []);

	return (
		<div className='flex flex-col gap-4 h-full '>
			{/* <div
				className={`fixed z-50 bg-black/50  opacity-0 transition-opacity duration-300 ${
					state.ui.isTodoCreate && 'opacity-100 inset-0'
				} `}
			></div> */}
			<section
				className={`flex flex-col gap-4 overflow-y-auto h-[calc(100vh-4rem)] p-4 transition-all duration-300 ${
					state.ui.isTodoView ? 'w-[calc(100%-var(--container-xl))]' : 'w-full'
				}`}
			>
				<h2 className='text-center'>Lista de Tareas</h2>
				<ul className='flex flex-col gap-4 max-w-lg mx-auto '>
					{state.todos &&
						state.todos.map((t) => (
							<TodoItem key={t.id} todo={t} handleCompleted={handleToggleTodo} handleTodoClick={handleTodoClick} />
						))}
				</ul>
			</section>
			<TodoDetail todo={state.selectedTodo} isOpenDetails={state.ui.isTodoView} ref={detailsRef} />
			<TodoCreator />
			<button
				className={`${
					state.ui.isTodoView && '-translate-x-[var(--container-xl))]'
				} right-4 fixed size-12 rounded-full border bottom-4 cursor-pointer z-50 transition duration-300`}
				onClick={() => dispatch({ type: 'TODO_CREATOR', payload: !state.ui.isTodoCreate })}
			>
				{state.ui.isTodoCreate ? 'x' : '+'}
			</button>
		</div>
	);
};
