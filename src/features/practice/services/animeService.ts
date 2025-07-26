import { Anime, AnimeApiResponse, SearchParams } from '../types/animeTypes';

export const fetchAnimes = async (params: SearchParams): Promise<AnimeApiResponse> => {
	const filtered = Object.fromEntries(Object.entries(params).filter(([, value]) => value && value !== ''));
	const query = new URLSearchParams(filtered).toString();
	const res = await fetch(`https://api.jikan.moe/v4/anime?${query}`);

	if (!res.ok) throw new Error('Error al obtener datos');
	const data = await res.json();
	return data;
};

export const fetchAnimeById = async (id: string): Promise<Anime> => {
	const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

	if (!res.ok) throw new Error(`Error al obtener anime con ID: ${id}`);
	const { data } = await res.json();
	return data;
};
