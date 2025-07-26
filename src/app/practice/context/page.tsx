'use client';

import { ContextReducer } from '@/features/practice/components/ContextReducer';
import { createContext, ReactNode, useContext, useState } from 'react';

type ContextType = {
	nombre: string;
	setNombre: (nombre: string) => void;
};

const BasicContext = createContext<ContextType | undefined>(undefined);

const BasicProvider = ({ children }: { children: ReactNode }) => {
	const [nombre, setNombre] = useState('');

	return <BasicContext.Provider value={{ nombre, setNombre }}>{children}</BasicContext.Provider>;
};

const useBasicContext = () => {
	const context = useContext(BasicContext);
	if (!context) throw new Error('No se inicializo el context');
	return context;
};

const ContextPage = () => {
	return (
		<BasicProvider>
			<NameComponent />
		</BasicProvider>
	);
};

const NameComponent = () => {
	const { nombre, setNombre } = useBasicContext();
	return (
		<div className='flex flex-col gap-4 p-4 items-center'>
			<div className='flex flex-col gap-4 text-center'>
				<div className='flex gap-4'>
					<input
						className='border rounded p-2'
						type='text'
						value={nombre}
						onChange={({ target }) => setNombre(target.value)}
					/>
					<button
						className='border rounded p-2 cursor-pointer'
						onClick={() => {
							setNombre(`N: ${(Math.random() * 100).toFixed().toString()}`);
						}}
					>
						Random
					</button>
				</div>
					{nombre !== '' ? nombre : '\u00A0'}
				<ContextReducer />
			</div>
		</div>
	);
};

export default ContextPage;
