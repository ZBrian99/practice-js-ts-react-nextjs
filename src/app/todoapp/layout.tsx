import { TodoProvider } from '@/context/TodoContext';
import { FormProvider } from '@/context/FormContext';
import { UIProvider } from '@/context/UIContext';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Todo App',
	description: 'App to easily and efficiently manage your daily tasks.',
};

const TodoAppLayout = ({ children }: { children: ReactNode }) => {
	return (
		<TodoProvider>
			<FormProvider>
				<UIProvider>
					{/* <nav className='w-full h-16 bg-gray-900 border-b border-gray-700/50 flex items-center justify-center px-4 sticky top-0 z-50'>
						<h1 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent'>
							Todo App
						</h1>
					</nav> */}
						{children}
				</UIProvider>
			</FormProvider>
		</TodoProvider>
	);
};

export default TodoAppLayout;
