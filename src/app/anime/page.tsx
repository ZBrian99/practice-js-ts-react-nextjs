import { AnimeList } from '../components/AnimeList';
import { LinkButton } from '../components/LinkButton';

const Page = () => {
	return (
		<main className='p-4'>
			<LinkButton text='Volver al Inicio' url='/' />
			<AnimeList />
		</main>
	);
};

export default Page;
