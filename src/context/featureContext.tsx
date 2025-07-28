'use client';

import { FeatureAction, FeatureState } from '@/types/featureReducerTypes';
import { featureReducer, initialFormState } from '@/utils/featureReducer';
import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer, useState } from 'react';

type AppContextType = {
	state: FeatureState;
	dispatch: Dispatch<FeatureAction>;
};

export const initialFeatureState: FeatureState = {
	form: {
		values: initialFormState,
		errors: {},
		touched: {},
	},
	selectedTodo: null,
	tags: [],
	todos: [],
	ui: {
		isLoading: false,
		isTodoCreate: false,
		isTodoView: false,
	},
};

const FeatureContext = createContext<AppContextType | undefined>(undefined);

export const FeatureProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(featureReducer, initialFeatureState);

	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		const todos = localStorage.getItem('todos');
		const tags = localStorage.getItem('tags');

		if (todos) dispatch({ type: 'SET_TODOS', payload: JSON.parse(todos) });
		if (tags) dispatch({ type: 'SET_TAGS', payload: JSON.parse(tags) });

		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (isHydrated) {
			localStorage.setItem('todos', JSON.stringify(state.todos));
		}
	}, [state.todos, isHydrated]);

	useEffect(() => {
		if (isHydrated) {
			localStorage.setItem('tags', JSON.stringify(state.tags));
		}
	}, [state.tags, isHydrated]);

	return <FeatureContext.Provider value={{ state, dispatch }}>{children}</FeatureContext.Provider>;
};

export const useFeatureContext = () => {
	const context = useContext(FeatureContext);
	if (!context) {
		throw new Error('Error al inicializar el context');
	}
	return context;
};
