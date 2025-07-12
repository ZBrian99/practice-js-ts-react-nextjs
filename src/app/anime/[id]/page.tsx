'use client';

import { BackButton } from '@/app/components/BackButton';
// import { LinkButton } from '@/app/components/LinkButton';
import { Anime, AnimeApiResponse } from '@/app/types/anime.type';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
	const { id } = useParams();
	const [anime, setAnime] = useState<Anime | null>(null);
	const [isLoading, setIsloading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!id) return;
		setIsloading(true);
		fetch(`https://api.jikan.moe/v4/anime/${id}`)
			.then((res) => res.json())
			.then((res: { data: Anime }) => {
				setAnime(res.data);
			})
			.catch((error) => setError(error))
			.finally(() => setIsloading(false));
	}, [id]);

	if (isLoading) return <div>Cargando...</div>;
	if (error) return <div>{error.message}</div>;
	if (!anime) return <div>Ocurrio un error inesperado</div>;

	return (
		<main className='p-4 min-h-screen flex flex-col max-w-6xl mx-auto gap-4'>
			<article className='flex w-full flex-col sm:flex-row gap-4 mb-auto '>
				<div className='w-full  sm:flex-2/4 md:flex-1/4 h-[20rem] sm:h-auto relative '>
					<Image
						src={anime.images.webp.large_image_url}
						alt={anime.title}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						className='object-contain rounded sm:object-top-left'
					/>
				</div>
				<div className='flex flex-col gap-4 sm:flex-3/4 '>
					<h1 className='text-2xl md:text-3xl'>{anime.title}</h1>
					<div className='flex flex-wrap gap-2 text-sm'>
						{anime.genres.map((genre) => (
							<span key={genre.mal_id + 1} className='px-2 py-1 bg-purple-900 rounded-lg'>
								{genre.name}
							</span>
						))}
					</div>
					<p className=' text-pretty text-md'>{anime.synopsis}</p>
					<div className='flex justify-between mt-auto'>
						<span>
							Fecha:{' '}
							{anime.aired.from
								? new Date(anime.aired.from).toLocaleDateString('es-ES', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
								  })
								: 'desconocida'}
						</span>
						<span>Nota: {anime.score ? `⭐${anime.score}` : 'desconocida'}</span>
					</div>
				</div>
			</article>
			<BackButton color='orange' />
			{/* <LinkButton text='Volver' url='/anime' color='orange' /> */}
		</main>
	);
}
