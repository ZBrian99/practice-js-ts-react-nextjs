'use client';

import { useEffect, useState } from 'react';
import { Anime, AnimeApiResponse, AnimePagination } from '../types/anime.type';
import { AnimeCard } from './AnimeCard';

const BASE_API = 'https://api.jikan.moe/v4/top/anime';

export const AnimeList = () => {
	const [animes, setAnimes] = useState<Anime[] | null>(null);
	const [isLoading, setIsloading] = useState(true);
	const [error, setError] = useState('');
	const [pagination, setPagination] = useState<AnimePagination | null>(null);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchAnime = async (page = 1, limit = 21) => {
			// 21 limit para que quede bonito :p
			try {
				setIsloading(true);
				const res = await fetch(`${BASE_API}?page=${page}&limit=${limit}`);
				const { data, pagination }: AnimeApiResponse = await res.json();
				setAnimes(data);
				setPagination(pagination);
				setPage(pagination.current_page);
				setIsloading(false);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else throw error;
			}
		};
		fetchAnime(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [page]);

	const handlePage = (action: 'prev' | 'next') => {
		if (!action) return;

		if (action === 'prev' && page > 1) {
			setPage((prev) => prev - 1);
		}
		if (action === 'next' && pagination?.has_next_page) {
			setPage((prev) => prev + 1);
		}
	};

	if (error) return <div>{error}</div>;
	if (!animes && isLoading) return <div>Cargando...</div>;
	if (!isLoading && animes?.length === 0) return <div>No se encontraron animes</div>;
	if (!isLoading && !animes) return <div>Ocurrio un error inesperado</div>;

	return (
		<div className='min-h-screen flex flex-col gap-4 p-4'>
			<div className='flex flex-wrap gap-6 justify-center'>
				{isLoading ? (
					<div>Cargando...</div>
				) : (
					animes && animes.map((anime, i) => <AnimeCard key={anime.mal_id + i} anime={anime} />)
				)}
			</div>
			{animes && (
				<div className='flex justify-center gap-4 mt-auto'>
					<button
						onClick={() => handlePage('prev')}
						className={`${pagination?.current_page !== 1 ? 'cursor-pointer' : 'text-gray-400'}`}
						disabled={pagination?.current_page === 1}
					>
						Prev
					</button>
					<span>{pagination?.current_page}</span>
					<button
						onClick={() => handlePage('next')}
						className={`${pagination?.has_next_page ? 'cursor-pointer' : 'text-gray-400'}`}
						disabled={!pagination?.has_next_page}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};
