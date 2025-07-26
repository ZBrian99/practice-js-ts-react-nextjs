'use client';

import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';

type TestForm = {
	name: string;
	email: string;
	age: string | number;
	multiple: string | number | boolean;
	obj: { a: string | number; b: number | boolean; c: number[] } | { a: string[] };
	message: string;
};

type TestState = {
	form: TestForm;
	errors: Partial<Record<keyof TestForm, string>>;
};

type TestAction<T> =
	| { [K in keyof T]: { type: 'SET_FIELD'; field: K; value: T[K] } }[keyof T]
	| { type: 'SET_ERROR'; field: keyof T; error: string }
	| { type: 'SET_ALL_ERRORS'; errors: Partial<Record<keyof T, string>> }
	| { type: 'RESET' };

const initialTestState: TestState = {
	form: {
		name: '',
		email: '',
		age: '',
		message: '',
		multiple: false,
		obj: {
			a: [],
		},
	},
	errors: {},
};

const testReducer = (state: TestState, action: TestAction<TestForm>): TestState => {
	switch (action.type) {
		case 'SET_FIELD':
			return { ...state, form: { ...state.form, [action.field]: action.value } };
		case 'SET_ERROR':
			return { ...state, errors: { ...state.errors, [action.field]: action.error } };
		case 'SET_ALL_ERRORS':
			return { ...state, errors: action.errors };
		case 'RESET':
			return initialTestState;
		default:
			return state;
	}
};

type TestContextType = {
	state: TestState;
	dispatch: Dispatch<TestAction<TestForm>>;
};

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(testReducer, initialTestState);

	return <TestContext.Provider value={{ state, dispatch }}>{children}</TestContext.Provider>;
};

export const useTestContext = () => {
	const context = useContext(TestContext);
	if (!context) throw new Error('El componente debe estar dentro de un provider');

	return context;
};

export const ContextReducer = () => {
	return (
		<TestProvider>
			<TestComponent />
		</TestProvider>
	);
};

const TestComponent = () => {
	const { state, dispatch } = useTestContext();

	return (
		<TestProvider>
			<div>
				<input
					className='border block'
					type='text'
					value={state.form.name}
					onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
				/>
				{state.form.name}
			</div>
		</TestProvider>
	);
};
