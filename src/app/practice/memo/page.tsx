'use client';

import React, { ChangeEvent,  useCallback, useEffect, useMemo, useState } from 'react';

interface NumberItem {
	id: number;
	value: number;
	label: string;
	category: 'low' | 'medium' | 'high';
}

const numberslistRaw: NumberItem[] = [
	{ id: 1, value: 12, label: 'Doce', category: 'low' },
	{ id: 2, value: 12, label: 'Cuarenta y cinco', category: 'medium' },
	{ id: 3, value: 23, label: 'Veintitrés', category: 'low' },
	{ id: 4, value: 67, label: 'Sesenta y siete', category: 'medium' },
	{ id: 5, value: 89, label: 'Ochenta y nueve', category: 'high' },
	{ id: 6, value: 34, label: 'Treinta y cuatro', category: 'medium' },
	{ id: 7, value: 56, label: 'Cincuenta y seis', category: 'medium' },
	{ id: 8, value: 78, label: 'Setenta y ocho', category: 'high' },
	{ id: 9, value: 90, label: 'Noventa', category: 'high' },
	{ id: 10, value: 11, label: 'Once', category: 'low' },
	{ id: 11, value: 22, label: 'Veintidós', category: 'low' },
	{ id: 12, value: 33, label: 'Treinta y tres', category: 'low' },
	{ id: 13, value: 44, label: 'Cuarenta y cuatro', category: 'medium' },
	{ id: 14, value: 55, label: 'Cincuenta y cinco', category: 'medium' },
	{ id: 15, value: 66, label: 'Sesenta y seis', category: 'medium' },
	{ id: 16, value: 77, label: 'Setenta y siete', category: 'high' },
	{ id: 17, value: 88, label: 'Ochenta y ocho', category: 'high' },
	{ id: 18, value: 99, label: 'Noventa y nueve', category: 'high' },
	{ id: 19, value: 100, label: 'Cien', category: 'high' },
	{ id: 20, value: 101, label: 'Ciento uno', category: 'high' },
];

interface MemoPageProps {
	numbersList: NumberItem[];
}

type FilterParams = {
	name?: string;
	high?: number;
	less?: number;
	category?: 'high' | 'medium' | 'low';
	even?: boolean;
	sortBy?: 'id' | 'value' | 'name' | 'category';
	sort?: 'asc' | 'desc';
};

const categoryOrder = {
	low: 0,
	medium: 1,
	high: 2,
};

type ProcessedItems = {
	numbers: (NumberItem & { unique: boolean })[];
	calc: number;
	max: { name: string; value: number };
	totalItems: number;
	hidden: { total: number; items: NumberItem[] };
};

const calcMulti = (number: number): number => {
	return ((number + 1) * number * number) / 34;
};

const MemoPage = ({ numbersList = numberslistRaw }: MemoPageProps) => {
	const [total, setTotal] = useState(0);
	const [items, setItems] = useState<ProcessedItems | null>(null);
	const [inputFilters, setInputFilters] = useState<FilterParams>({});

	const filterItems = useMemo(() => {
		console.log('filterItems');
		const filteredItems = numbersList.reduce<ProcessedItems>(
			(acc, number) => {
				if (inputFilters?.name && !number.label.includes(inputFilters.name)) {
					acc.hidden.total++;
					acc.hidden.items.push(number);
					return acc;
				}
				if (inputFilters?.category && number.category !== inputFilters.category) {
					acc.hidden.total++;
					acc.hidden.items.push(number);
					return acc;
				}
				if (inputFilters?.even && number.value % 2 !== 0) {
					acc.hidden.total++;
					acc.hidden.items.push(number);
					return acc;
				}
				if (inputFilters?.high && number.value < inputFilters.high) {
					acc.hidden.total++;
					acc.hidden.items.push(number);
					return acc;
				}
				if (inputFilters?.less && number.value > inputFilters.less) {
					acc.hidden.total++;
					acc.hidden.items.push(number);
					return acc;
				}

				acc.numbers.push({ ...number, unique: !acc.numbers.some((num) => num.value === number.value) });
				acc.calc = calcMulti(number.value);
				if (!acc.max.value || number.value > acc.max.value) {
					acc.max = { name: number.label, value: number.value };
				}
				acc.totalItems++;

				return acc;
			},
			{
				numbers: [],
				calc: 0,
				max: {} as { name: string; value: number },
				totalItems: 0,
				hidden: { total: 0, items: [] },
			}
		);
		if (inputFilters?.sort) {
			filteredItems.numbers.sort((a, b) => {
				if (inputFilters.sort === 'asc') {
					if (inputFilters.sortBy === 'value') return a.value - b.value;
					if (inputFilters.sortBy === 'id') return a.id - b.id;
					if (inputFilters.sortBy === 'name') return a.label.localeCompare(b.label);
					if (inputFilters.sortBy === 'category') return categoryOrder[a.category] - categoryOrder[b.category];
				}
				if (inputFilters.sort === 'desc') {
					if (inputFilters.sortBy == 'value') return b.value - a.value;
					if (inputFilters.sortBy === 'id') return b.id - a.id;
					if (inputFilters.sortBy === 'name') return b.label.localeCompare(a.label);
					if (inputFilters.sortBy === 'category') return categoryOrder[b.category] - categoryOrder[a.category];
				}
				return 0;
			});
		}

		return filteredItems;
	}, [inputFilters]);

	useEffect(() => {
		setItems(filterItems);
	}, [inputFilters]);

	const handleSumItem = useCallback((id: number) => {
		setItems((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				numbers: prev.numbers.map((num) => ({ ...num, value: num.id === id ? num.value + 1 : num.value })),
			};
		});
	}, []);

	const handleNameFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setInputFilters((prev) => ({ ...prev, name: e.target.value }));
	}, []);

	const handleCategoryFilter = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		setInputFilters((prev) => ({ ...prev, category: e.target.value as 'low' | 'medium' | 'high' }));
	}, []);

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex gap-4 place-items-center'>
				<button
					className='border rounded cursor-pointer py-1 px-2'
					onClick={() => setTotal((prev) => prev + 1)}
					onKeyDown={() => setTotal((prev) => prev + 1)}
				>
					Sum
				</button>
				{total !== 0 && <span>Calculo: {total}</span>}
			</div>
			<Filters inputFilters={inputFilters} handleName={handleNameFilter} handleCategory={handleCategoryFilter} />
			<ul>
				{items?.numbers.map((number) => (
					<NumberItem key={number.id} number={number} handleSumItem={handleSumItem} />
				))}
			</ul>
		</div>
	);
};
export default MemoPage;

interface NumberItemProps {
	number: NumberItem;
	handleSumItem: (number: number) => void;
}

const NumberItem = React.memo(({ number, handleSumItem }: NumberItemProps) => {
	return (
		<li>
			{`${number.value} - ${number.label} `}
			<button
				className='rounded-full px-2 border cursor-pointer '
				onClick={() => handleSumItem(number.id)}
				onKeyDown={() => handleSumItem(number.id)}
			>
				+
			</button>
		</li>
	);
});

interface FiltersProps {
	inputFilters: FilterParams;
	handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filters = React.memo(({ inputFilters, handleName, handleCategory }: FiltersProps) => {
	console.log('Filters component');
	return (
		<div className='flex gap-4'>
			<input
				type='text'
				placeholder='Nombre'
				className='border rounded py-1 px-2'
				value={inputFilters.name}
				onChange={handleName}
			/>
			<select className='border rounded py-1 px-2' value={inputFilters.category} onChange={handleCategory}>
				<option className='bg-black' value=''>
					Categoria
				</option>
				<option className='bg-black' value='low'>
					Low
				</option>
				<option className='bg-black' value='medium'>
					Medium
				</option>
				<option className='bg-black' value='high'>
					High
				</option>
			</select>
		</div>
	);
});


// dudas:
// 
// No se si el manejo de filtros lo hice bien o de forma estandar, osea tanto el tipado como a la hora de filtrar etc, siento que duplique logica, pero no se me ocurrio como evitarlo
// Me la quise complicar con el procesamiento, por ello el reducer tan complejo, no se si la forma en la que lo tipe es la correcta, sobre todo las partes donde uso as o donde inicializo el acumulador
// 
// React.memo creo que mas o menos lo entiendo, osea visualmente pude ver como pasamos de que se rerendericen los filtros cuando hago sum o que se re renderice toda la lista cuando hago sum a qe no ocurra, clave, pero no se si deberia usarlo siempre que note re renders donde no corresponde o solamente si esos re renders suponen un costo y como se si realmente suponen un costo contra el costo de memo? useCallback entiendo que se usa solo si hay un react memo recibiendo funciones como props para que el react memo haga efecto, sino es como si nada y se sigue re renderizando.
// 
// En cuanto a useMemo aqui no logro comprender donde esta la mejora, osea se y entiendo que debo usarlo en calculos complejos, grandes, filtros, etc. lo he usado pero no logro saber si hace o no efecto y que es lo que hace realmente en la practica.
// 
// Actualmente si hago el sum individual de un item, la lista entera se vuelve a renderizar, osea eso esta bien? si un item cambia todos deben re renderizarse es el comportamiento normal o eso no deberia ocurrir?
// 
// en el select no se como poner que salga por defecto Categoria en el input, pero que al desplegar el select "Categoria" no este como opcion, osea no se si es correcto que si son 3 opciones una de ella sea el nombre del input que por defecto seria el "" valor vacio.
// 
// Revisa todo el tipado y dime si esta bien o he fallado en algo.
// 
// Revisa el useReducer, el reducer, el sort, y dime si asi esta bien hecho o deberia haberlo hecho de otra manera.
// 
// 
// 
// En general he de decir que me diverti y se me pasaron las horas super rapido, pensar que hace meses no sabia tipar, ni usar nada de optimizacion, ni un reducer, nada, apenas sabia usar useState y useEffect y aqui estamos, entendiendo como funcionan cosas de react que no se si seran basicas que pero son muy utiles.