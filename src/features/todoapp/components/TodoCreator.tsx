import { useFeatureContext } from '@/context/featureContext';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Todo, TodoPriority, TodoTag } from '../type/todoTypes';
import { TodoTagsSelector } from './TodoTagsSelector';

export const TodoCreator = () => {
	const creatorTodoRef = useRef<HTMLDivElement | null>(null);

	const { state, dispatch } = useFeatureContext();

	// const [searchTag, setSearchTag] = useState('');
	// const [isOpenTagSelecctor, setIsOpenTagSelecctor] = useState(false);
	// const [filteredTags, setFilteredTags] = useState<TodoTag[]>([]);

	// useMemo(() => {
	// 	if (searchTag === undefined) return;
	// 	const tags = state.tags.filter((t) => t.name.includes(searchTag));
	// 	setFilteredTags(tags);
	// }, [state.tags, searchTag]);

	useEffect(() => {
		const handleClickOutsideCreator = (e: Event) => {
			const target = e.target as Node;
			if (creatorTodoRef.current && !creatorTodoRef.current.contains(target)) {
				dispatch({ type: 'TODO_CREATOR', payload: false });
				// setIsOpenTagSelecctor(false);
				// setSearchTag('');
			}
		};

		if (state.ui.isTodoCreate) {
			document.addEventListener('click', handleClickOutsideCreator);
		}

		return () => {
			document.removeEventListener('click', handleClickOutsideCreator);
		};
	}, [state.ui.isTodoCreate]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submit');
		const now = Date.now().toString();

		const newTodo: Todo = {
			id: now,
			...state.form.values,
			createdAt: now,
		};
		dispatch({ type: 'TODO_CREATOR', payload: false });
		dispatch({ type: 'ADD_TODO', payload: newTodo });
		dispatch({ type: 'RESET' });
		// setIsOpenTagSelecctor(false);
		// setSearchTag('');

		console.log(newTodo);
	};

	return (
		<div
			ref={creatorTodoRef}
			className={`
        ${state.ui.isTodoCreate ? 'translate-y-0' : 'translate-y-full'}
        mt-auto z-50  bg-black fixed bottom-0 left-0 right-0 py-8 transition-transform duration-300 border-t `}
		>
			<form className='w-md border rounded flex flex-col p-4 gap-4 mx-auto' onSubmit={handleSubmit}>
				<div className='flex flex-col'>
					<label htmlFor='newTodoTitle'>Titulo:</label>
					<input
						required
						className='border rounded py-1 px-2'
						type='text'
						id='newTodoTitle'
						value={state.form.values.title}
						onChange={(e) => {
							dispatch({ type: 'SET_FIELD', field: 'title', value: e.target.value });
						}}
					/>
				</div>

				<div className='flex flex-col'>
					<label htmlFor='newTodoDescription'>Descripción:</label>
					<textarea
						className='border rounded'
						rows={4}
						id='newTodoDescription'
						value={state.form.values.description}
						onChange={(e) => {
							dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value });
						}}
					/>
				</div>

				<div className='flex gap-4'>
					<div className='flex flex-col w-full'>
						<label htmlFor='newTodoDateStart'>Fecha Inicio:</label>
						<input
							type='datetime-local'
							id='newTodoDateStart'
							className='w-full border rounded py-1 px-2 scheme-dark'
							// className='appearance-auto bg-gray-900 text-white border border-gray-600 p-2 rounded fill-white scheme-dark'
							value={state.form.values.dueDate}
							onChange={(e) => {
								dispatch({ type: 'SET_FIELD', field: 'dueDate', value: e.target.value });
							}}
						/>
					</div>
					<div className='flex flex-col w-full'>
						<label htmlFor='newTodoDateEnd'>Fecha Fin:</label>
						<input
							type='datetime-local'
							id='newTodoDateEnd'
							className='w-full border rounded py-1 px-2 scheme-dark'
							// className='appearance-auto bg-gray-900 text-white border border-gray-600 p-2 rounded fill-white scheme-dark'
							value={state.form.values.dueDate}
							onChange={(e) => {
								dispatch({ type: 'SET_FIELD', field: 'dueDate', value: e.target.value });
							}}
						/>
					</div>
				</div>
				<div className='flex gap-4'>
					<div className='flex flex-col w-full'>
						<label htmlFor='newTodoPriority'>Prioridad:</label>
						<select
							id='newTodoPriority'
							className='w-full border rounded py-[6.5px] px-2'
							value={state.form.values.priority}
							onChange={(e) => {
								dispatch({ type: 'SET_FIELD', field: 'priority', value: e.target.value as TodoPriority });
							}}
						>
							<option className='bg-black' defaultValue='ninguna'>
								Ninguna
							</option>
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
					<TodoTagsSelector />
				</div>

				<div className='flex gap-2 overflow-x-clip'>
					{state.form.values.tags.map((t) => (
						<span key={t.id} className={`relative py-0.5 px-2 rounded-full group/tag ${t.color}`}>
							{t.name}
							<button
								type='button'
                onClick={(e) => {
									const tags = state.form.values.tags.filter((f) => f.id !== t.id);
									// dispatch({ type: 'SET_FIELD', field: 'tags', value: state.form.values.tags });
									dispatch({ type: 'SET_FIELD', field: 'tags', value: tags });
								}}
								className='absolute w-6 h-6 right-0.5 opacity-0 group-hover/tag:opacity-100 bg-gray-900/80 hover:bg-gray-900 rounded-full cursor-pointer transition-opacity duration-100'
							>
								x
							</button>
						</span>
					))}
				</div>
				<button className='border rounded py-1 px-4 cursor-pointer'>Crear Tarea</button>
			</form>
		</div>
	);
};
