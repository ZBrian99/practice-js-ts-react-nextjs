import { useFeatureContext } from '@/context/featureContext';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TodoTag } from '../type/todoTypes';

export const TodoTagsSelector = () => {
	const tagSelectorRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [searchTag, setSearchTag] = useState('');
	const [isOpenTagSelecctor, setIsOpenTagSelecctor] = useState(false);
	const [filteredTags, setFilteredTags] = useState<TodoTag[]>([]);
	const { state, dispatch } = useFeatureContext();

	useMemo(() => {
		if (searchTag === undefined) return;
		const tags = state.tags.filter((t) => t.name.includes(searchTag));
		setFilteredTags(tags);
	}, [state.tags, searchTag]);

	useEffect(() => {
		const handleClickOutsideTags = (e: Event) => {
			const target = e.target as Node;
			if ((tagSelectorRef.current && !tagSelectorRef.current.contains(target)) || !state.ui.isTodoCreate) {
				setSearchTag('');
				setIsOpenTagSelecctor(false);
			}
		};

		if (isOpenTagSelecctor) {
			document.addEventListener('click', handleClickOutsideTags);
		}

		return () => {
			document.removeEventListener('click', handleClickOutsideTags);
		};
	}, [isOpenTagSelecctor]);

	const handleSelectTag = (t: TodoTag) => {
    if (state.form.values.tags.some((f) => f.id === t.id)) return;
    
		dispatch({ type: 'SET_FIELD', field: 'tags', value: [t, ...state.form.values.tags] });
    setSearchTag('');
    
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	return (
		<div className='flex flex-col w-full relative' ref={tagSelectorRef}>
			<label htmlFor='newTodoTags'>Tags:</label>
			<input
				type='text'
				id='newTodoTags'
				className='w-full border rounded py-1 px-2 '
				ref={inputRef}
				value={searchTag}
				onClick={() => {
					setIsOpenTagSelecctor(true);
				}}
				onChange={(e) => setSearchTag(e.target.value)}
			/>
			{isOpenTagSelecctor && (
				<div className='absolute w-full bg-purple-500 bottom-8 border rounded'>
					<ul className='flex flex-col'>
						{filteredTags.length > 0 ? (
							filteredTags.map((t) => (
								<li
									key={t.id}
									className={`py-px px-3 bg-gray-800 hover:bg-gray-600`}
									onClick={() => handleSelectTag(t)}
								>
									{t.name}
								</li>
							))
						) : (
							<li
								className='py-px px-3 bg-gray-700 hover:bg-gray-500'
								onClick={(e) => {
									const newTag = {
										id: Date.now().toString(),
										color: 'bg-red-400',
										name: searchTag,
									};
									dispatch({
										type: 'ADD_TAG',
										payload: newTag,
									});
									dispatch({ type: 'SET_FIELD', field: 'tags', value: [newTag, ...state.form.values.tags] });
									setSearchTag('');
								}}
							>
								Crear y añadir
							</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};
