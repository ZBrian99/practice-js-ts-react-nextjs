import { ChangeEvent, MouseEvent } from 'react';

export interface TodoItemProps {
	todo: Todo;
	handleCompleted: (id: string) => void;
	handleTodoClick: (id: Todo, e: MouseEvent<HTMLDivElement>) => void;
	// handleOpenDetails: (e: MouseEvent<HTMLDivElement>, todo: Todo) => void;
}

export interface TodoTag {
	id: string;
	name: string;
	color: string;
}

export type TodoPriority = 'ninguna' | 'baja' | 'media' | 'alta' | 'urgente';

export type TodoTask = {
	id: string;
	title: string;
	completed: boolean;
};

export interface Todo {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
	priority: TodoPriority;
	dueDate?: string;
	createdAt: string;
	tags?: TodoTag[];
	task?: TodoTask[];
}

export type TodoForm = {
	title: string;
	description: string;
	priority: TodoPriority;
	dueDate: string;
	tags: TodoTag[];
	task: TodoTask[];
	completed: boolean;
};
