import { FeatureProvider } from '@/context/featureContext';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Todo App',
	description: 'App to easily and efficiently manage your daily tasks.',
};

 const TodoAppLayout = ({ children }: { children: ReactNode }) => {
   return (
			<FeatureProvider>
				<div className='overflow-hidden'>{children}</div>
			</FeatureProvider>
		);
};

export default TodoAppLayout;
