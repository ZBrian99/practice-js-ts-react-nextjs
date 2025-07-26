'use client';
import { useReducer } from 'react';

type CountState = { count: number; history: number[] };

// type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };
type CountAction = { type: 'increment' | 'decrement' | 'reset' };
// cual de las dos formas de typar el Action es correcta o es lo mismo?

// type CountAction = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };

const countInitialState: CountState = {
	count: 0,
	history: [],
};

// const reducer = ()=>{}
// function reducer(){}
// cual es la forma correcta de hacer la funcion del reducer o da lo mismo?

function countReducer(state: CountState, action: CountAction): CountState {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1, history: [...state.history, state.count + 1] };
		case 'decrement':
			return { count: state.count - 1, history: [...state.history, state.count - 1] };
		case 'reset':
			return countInitialState;
		default:
			return state;
	}
}

const ReducerPage = () => {
	const [state, dispatch] = useReducer(countReducer, countInitialState);

	return (
		<div>
			<div className='flex flex-wrap justify-center gap-4'>
				<p className='w-full text-center'>Contador: {state.count}</p>
				<button className='border py-1 px-2 rounded cursor-pointer' onClick={() => dispatch({ type: 'increment' })}>
					Aumentar
				</button>
				<button className='border py-1 px-2 rounded cursor-pointer' onClick={() => dispatch({ type: 'decrement' })}>
					Disminuir
				</button>
				<button className='border py-1 px-2 rounded cursor-pointer' onClick={() => dispatch({ type: 'reset' })}>
					Reset
				</button>
				{state.history.length > 0 && <p className='w-full'>Historial: {state.history.join(', ')}.</p>}
			</div>
			<br />
			<UseReducerForm />
		</div>
	);
};

export default ReducerPage;

type InputError = Partial<Record<'name' | 'email' | 'message', string>>;
type State = {
	value: {
		name: string;
		email: string;
		message: string;
	};
	errors?: InputError;
};

type Action = { type: 'name' | 'email' | 'message' | 'submit' | 'reset'; value?: string };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialState: State = {
	value: {
		name: '',
		email: '',
		message: '',
	},
};
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'name':
			if (action.value || action.value === '') {
				if (state.errors?.name && action.value.length >= 4) {
					return {
						...state,
						value: { ...state.value, name: action.value },
						errors: { ...state.errors, name: undefined },
					};
				} else return { ...state, value: { ...state.value, name: action.value } };
			} else return state;
		case 'email':
			if (action.value || action.value === '') {
				if (state.errors?.email && emailRegex.test(action.value)) {
					return {
						...state,
						value: { ...state.value, email: action.value },
						errors: { ...state.errors, email: undefined },
					};
				} else return { ...state, value: { ...state.value, email: action.value } };
			} else return state;
		case 'message':
			if (action.value || action.value === '') {
				if (state.errors?.message && action.value.length >= 10) {
					return {
						...state,
						value: { ...state.value, message: action.value },
						errors: { ...state.errors, message: undefined },
					};
				} else return { ...state, value: { ...state.value, message: action.value } };
			} else return state;
		case 'submit':
			const errors: InputError = {};
			if (state.value.name.length < 4) {
				errors.name = 'El Nombre debe tener al menos 4 caracteres';
			}
			if (!emailRegex.test(state.value.email)) {
				errors.email = 'El Email no es valido';
			}
			if (state.value.message.length < 10) {
				errors.message = 'El Mensaje debe tener al menos 10 caracteres';
			}

			if (Object.keys(errors).length > 0) {
				return { ...state, errors };
			} else {
				console.log(state);
				return initialState;
			}
		case 'reset':
			return initialState;
		default:
			return state;
	}
};

const UseReducerForm = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<div>
			<h2 className='text-center mb-4'>Formulario</h2>
			<form
				className='flex flex-col max-w-md mx-auto gap-2'
				onSubmit={(e) => {
					e.preventDefault();
					dispatch({ type: 'submit' });
				}}
			>
				<input
					value={state.value.name}
					onChange={(e) => dispatch({ type: 'name', value: e.target.value })}
					className='border py-1 px-2 rounded'
					type='text'
					placeholder='Nombre'
				/>
				{state.errors?.name && <span className='text-sm text-red-400'>{state.errors.name}</span>}
				<input
					value={state.value.email}
          onChange={(e) => dispatch({ type: 'email', value: e.target.value })}
					className='border py-1 px-2 rounded'
					type='text'
					placeholder='Email'
				/>
				{state.errors?.email && <span className='text-sm text-red-400'>{state.errors.email}</span>}
				<textarea
					value={state.value.message}
					onChange={(e) => dispatch({ type: 'message', value: e.target.value })}
					className='border py-1 px-2 rounded'
					rows={4}
					placeholder='Mensaje'
				></textarea>
				{state.errors?.message && <span className='text-sm text-red-400'>{state.errors.message}</span>}
				<button
					type='button'
					className='border py-1 px-2 rounded cursor-pointer'
					onClick={() => dispatch({ type: 'reset' })}
				>
					Reset
				</button>
				<button className='border py-1 px-2 rounded cursor-pointer' type='submit'>
					Enviar
				</button>
			</form>
		</div>
	);
};

// Dudas que me surgen
// Lo de los formularios seria asi como lo pides? es normal que cada vez que escribo se vuelva a renderizar todo el componente del formulario? si hago dispatch del reset se ejecuta el console log del submit.
// si hay algo que debia hacerse de otra manera me lo dices.
// Me gustaria algo mas complejo para reducer a menos que no se use tanto o no sea necesario que lo aprenda o siga practicando y consideres que sea mejor avanzar a otra cosa.
// En general creo que no es dificil, defines un estado y una action, me suena algo de redux de que se recibia un payload, aqui no se si se usa eso o es mas simple, no se si en el switch case hice bien lo de los ifs o se hacce de otra manera, tambien pense, si value fuese numeros o mas cosas?, ademas las comprobaciones donde deberian hacerse? y si hubiera un mensaje de error a mostrar como lo mando correctamente, en general, se que usare react hook form con zod, pero me parece interesante saber como se hace esto bien


// ahi logre terminar lo de los errores, funcionan, aparecen cuando deben y todo, pero no se si esta bien hecho, si la logica va en el reducer o fuera, si no estoy duplicando comprobaciones, si consume muchos recursos etc. osea podria comprobar en cada onchange pero eso consume mucho o al menos eso creo, por lo que lo hice asi en el submit solamente, de hecho si quisiera hacerlo bien lo que haria es usar alguna forma de que se valide al quitar el focus del input, algo asi como hace react hook form ya que considero que es mas eficiente que hacerlo en cada onchange, eso o solo hacerlo al hacer submit, pero no se cual es el evento de onLeaveFocus o que se usar en su lugar o si es buena idea.

// En general la idea era entender useReducer, creo que lo entendi, es un poco engorroso sobretodo si crece la logica, pero si esta bien lo que hice entonces lo entendi, si esta mal lo que hice quizas no lo entendi del todo, mas haya de si lo de los formularios esta bien o mal hecho.
