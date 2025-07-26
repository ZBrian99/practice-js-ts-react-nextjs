'use client'

import { FeatureAction, FeatureState } from '@/types/featureReducerTypes';
import { featureReducer, initialFormState } from '@/utils/featureReducer';
import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';

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
	return <FeatureContext.Provider value={{ state, dispatch }}>{children}</FeatureContext.Provider>;
};

export const useFeatureContext = () => {
	const context = useContext(FeatureContext);
	if (!context) {
		throw new Error('Error al inicializar el context');
	}
	return context;
};
