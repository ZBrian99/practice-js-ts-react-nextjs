import Image from 'next/image';
import { Anime } from '../types/anime.type';
import Link from 'next/link';

interface AnimeCardProps {
	anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
	return (
		<Link href={`/anime/${anime.mal_id}`} className='flex flex-col w-[10rem] h-auto bg-gray-700 rounded'>
			<Image
				src={anime.images.webp.large_image_url}
				alt={anime.title}
				width={160}
				height={240}
				priority
				className='object-cover h-[15rem] rounded'
			/>
			<h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-center w-full p-2 capitalize'>
				{anime.title}
			</h3>
		</Link>
	);
};
