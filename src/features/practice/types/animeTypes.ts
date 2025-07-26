// Tipos para la respuesta de la API de anime

export type SearchParams = {
	q?: string;
	page: string;
	limit?: string;
	order_by?: string;
	genre?: string;
	sort?: 'asc' | 'desc' | '';
};
export interface AnimeApiResponse {
	pagination: AnimePagination;
	data: Anime[];
}

export interface AnimePagination {
	last_visible_page: number;
	has_next_page: boolean;
	current_page: number;
	items: {
		count: number;
		total: number;
		per_page: number;
	};
}

export interface Anime {
	mal_id: number;
	url: string;
	images: {
		jpg: AnimeImageFormat;
		webp: AnimeImageFormat;
	};
	trailer: AnimeTrailer;
	approved: boolean;
	titles: AnimeTitle[];
	title: string;
	title_english: string;
	title_japanese: string;
	title_synonyms: string[];
	type: string;
	source: string;
	episodes: number;
	status: string;
	airing: boolean;
	aired: AnimeAired;
	duration: string;
	rating: string;
	score: number;
	scored_by: number;
	rank: number;
	popularity: number;
	members: number;
	favorites: number;
	synopsis: string;
	background: string;
	season: string;
	year: number;
	broadcast: AnimeBroadcast;
	producers: AnimeCompany[];
	licensors: AnimeCompany[];
	studios: AnimeCompany[];
	genres: AnimeGenre[];
	explicit_genres: AnimeGenre[];
	themes: AnimeGenre[];
	demographics: AnimeGenre[];
}

export interface AnimeImageFormat {
	image_url: string;
	small_image_url: string;
	large_image_url: string;
}

export interface AnimeTrailer {
	youtube_id: string;
	url: string;
	embed_url: string;
	images: {
		image_url: string;
		small_image_url: string;
		medium_image_url: string;
		large_image_url: string;
		maximum_image_url: string;
	};
}

export interface AnimeTitle {
	type: string;
	title: string;
}

export interface AnimeAired {
	from: string;
	to: string;
	prop: {
		from: AnimeDateProp;
		to: AnimeDateProp;
	};
	string: string;
}

export interface AnimeDateProp {
	day: number;
	month: number;
	year: number;
}

export interface AnimeBroadcast {
	day: string;
	time: string;
	timezone: string;
	string: string;
}

export interface AnimeCompany {
	mal_id: number;
	type: string;
	name: string;
	url: string;
}

export interface AnimeGenre {
	mal_id: number;
	type: string;
	name: string;
	url: string;
}
