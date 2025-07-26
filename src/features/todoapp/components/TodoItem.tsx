'use client';

import React from 'react';
import { TodoItemProps, TodoPriority } from '../type/todoTypes';

const priorityColors: Record<TodoPriority, { text: string; bg: string; border: string }> = {
	ninguna: {
		text: 'text-gray-200',
		bg: 'bg-gray-800',
		border: 'border-gray-700',
	},
	baja: {
		text: 'text-green-300',
		bg: 'bg-green-800',
		border: 'border-green-700',
	},
	media: {
		text: 'text-yellow-200',
		bg: 'bg-yellow-700',
		border: 'border-yellow-700',
	},
	alta: {
		text: 'text-red-200',
		bg: 'bg-red-800',
		border: 'border-red-700',
	},
	urgente: {
		text: 'text-purple-200',
		bg: 'bg-purple-800',
		border: 'border-purple-700',
	},
};

export const TodoItem = React.memo(({ todo, handleCompleted }: TodoItemProps) => {
	return (
		<div
			className={`border-2 ${todo.completed && 'opacity-50'} ${
				priorityColors[todo.priority].border
			} rounded p-4 w-full `}
		>
			<div
				className={`flex items-center mb-2 gap-2 border-b-2 pb-2 ${priorityColors[todo.priority].border}
				}`}
			>
				<label className='flex gap-2 cursor-pointer'>
					<input
						type='checkbox'
						checked={todo.completed}
						onChange={() => handleCompleted(todo.id)}
						className='peer hidden'
					/>
					<div
						className={`w-5 h-5 p-3  border-2 ${
							priorityColors[todo.priority].border
						}  font-bold  rounded-sm   flex text-center justify-center items-center `}
					>
						{todo.completed ? '✓' : ''}
					</div>
				</label>
				<h3>{todo.title}</h3>
			</div>
			<p className='text-[.9rem] text-gray-400'>{todo.description}</p>
			<div className='flex flex-wrap gap-1 my-3'>
				{todo?.tags &&
					todo.tags.map((tag) => (
						<span key={tag.id} className={`${tag.color} rounded-full py-0.5 px-2 text-sm`}>
							{tag.name}
						</span>
					))}
			</div>
			{todo.dueDate && (
				<div className='flex gap-4 justify-between  text-sm text-gray-400'>
					{/* <span>2/4</span> */}
					<span className={new Date(todo.dueDate) < new Date() ? 'text-red-500' : ''}>
						{new Date(todo.dueDate)
							.toLocaleDateString('es-AR', {
								day: 'numeric',
								month: 'long',
								// year: 'numeric',
							})
							.replace('-', ' ')}
					</span>
				</div>
			)}
		</div>
	);
});
