'use client';

import { FormEvent, JSX, useState } from 'react';

export type Task = {
	id: number;
	text: string;
};

export const TodoListBasic = (): JSX.Element => {
	const [todos, setTodos] = useState<Task[]>([]);
	const [text, setText] = useState('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
		if (!text.trim()) return;

		const todo = {
			id: Date.now(),
			text,
		};

		setTodos((prev) => [...prev, todo]);

		setText('');
	};

	const handleDeleteTask = (id: number) => {
    
		setTodos((prev) => prev.filter((t) => t.id !== id));
	};

	return (
		<div>
      <form action='' onSubmit={handleSubmit}>
        <label htmlFor="taskId">Tarea: </label>
				<input type='text' id='taskId' value={text} onChange={(e) => setText(e.target.value)} />
				<button type='submit'>Añadir</button>
			</form>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.text}
						<button onClick={() => handleDeleteTask(todo.id)}>❌</button>
					</li>
				))}
			</ul>
		</div>
	);
};
