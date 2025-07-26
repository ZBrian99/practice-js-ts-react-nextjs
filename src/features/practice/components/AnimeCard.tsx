import Image from 'next/image';
import { Anime } from '../types/animeTypes';

export const AnimeCard = ({ anime }: { anime: Anime }) => (
	<div className='w-[10rem] bg-gray-800 rounded'>
		<Image
			src={anime.images.webp.large_image_url}
			alt={anime.title}
			width={160}
			height={240}
			className='rounded-t object-cover h-[15rem]'
		/>
		<div className='p-2 text-center truncate'>{anime.title}</div>
	</div>
);
