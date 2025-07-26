'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { AnimeCard } from '@/features/practice/components/AnimeCard';
import { PaginationControls } from '@/components/PaginationControls';
import { useDebounced } from '@/hooks/useDebounced';
import Link from 'next/link';
import { fetchAnimes } from '@/features/practice/services/animeService';
import { AnimeApiResponse, SearchParams } from '@/features/practice/types/animeTypes';

export const AnimeList = () => {
	const router = useRouter();
	const urlParams = useSearchParams();

	const initialParams: SearchParams = {
		q: urlParams.get('q') || '',
		page: urlParams.get('page') || '1',
		limit: urlParams.get('limit') || '',
		order_by: urlParams.get('order_by') || 'popularity',
		genre: urlParams.get('genre') || '',
		sort: (urlParams.get('sort') as 'asc' | 'desc') || '',
	};

	const [params, setParams] = useState<SearchParams>(initialParams);
	const debouncedParams = useDebounced(params);
	const [response, setResponse] = useState<AnimeApiResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const updateQueryString = (newParams: SearchParams) => {
		const cleaned = Object.fromEntries(Object.entries(newParams).filter(([, v]) => v && v !== ''));
		const queryStrings = new URLSearchParams(cleaned).toString();
		router.push(`?${queryStrings}`);
	};

	useEffect(() => {
		updateQueryString(debouncedParams);
		setLoading(true);
		fetchAnimes(debouncedParams)
			.then(setResponse)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [debouncedParams]);

	const handlePage = (page: number) => {
		if (page < 1 || (response && page > response?.pagination.last_visible_page)) return;
		setParams((prev) => ({ ...prev, page: String(page) }));
	};

	return (
		<div className='flex flex-col gap-4'>
			<div>
				<input
					type='text'
					placeholder='Buscar...'
					value={params.q || ''}
					onChange={({ target }) => setParams({ ...params, q: target.value, page: '1' })}
					className='outline-0 border border-transparent focus:border focus:border-gray-300 rounded py-1 px-2'
				/>
				<select
					className='ml-4 p-2 rounded bg-gray-700 text-white'
					value={params.genre || ''}
					onChange={({ target }) => setParams({ ...params, genre: target.value, page: '1' })}
					aria-label='Filtrar por género'
				>
					<option value=''>Géneros</option>
					<option value='action'>Acción</option>
					<option value='adventure'>Aventura</option>
					<option value='comedy'>Comedia</option>
					<option value='drama'>Drama</option>
					<option value='fantasy'>Fantasía</option>
					<option value='romance'>Romance</option>
					<option value='sci-fi'>Ciencia Ficción</option>
				</select>

				<select
					className='ml-4 p-2 rounded bg-gray-700 text-white'
					value={params.limit || ''}
					onChange={({ target }) => setParams((prev) => ({ ...prev, limit: target.value, page: '1' }))}
				>
					<option value=''>Items</option>
					<option value='20'>20</option>
					<option value='50'>50</option>
					<option value='100'>100</option>
				</select>

				<select
					className='ml-4 p-2 rounded bg-gray-700 text-white'
					value={params.order_by || ''}
					onChange={({ target }) => setParams((prev) => ({ ...prev, order_by: target.value, page: '1' }))}
				>
					<option value=''>Ordenar por</option>
					<option value='title'>Título</option>
					<option value='score'>Puntuación</option>
					<option value='popularity'>Popularidad</option>
				</select>

				<select
					className='ml-4 p-2 rounded bg-gray-700 text-white'
					value={params.sort || ''}
					onChange={({ target }) => setParams((prev) => ({ ...prev, sort: target.value as 'asc' | 'desc', page: '1' }))}
				>
					<option value='asc'>Asc</option>
					<option value='desc'>Desc</option>
				</select>
			</div>
			{error && <div className='text-red-500'>{error}</div>}

			<div className='flex flex-wrap gap-4 justify-center'>
				{loading
					? 'Cargando...'
					: !response?.data || response.data.length === 0
					? 'No se encontraron resultados'
					: response?.data.map((anime) => (
							<Link href={`/anime/${anime.mal_id}`} key={anime.mal_id + 1}>
								<AnimeCard anime={anime} />
							</Link>
					  ))}
			</div>

			{response?.pagination && (
				<PaginationControls
					currentPage={response.pagination.current_page}
					hasNextPage={response.pagination.has_next_page}
					onPageChange={handlePage}
				/>
			)}
		</div>
	);
};
