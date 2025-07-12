// import { TodoList } from './components/TodoList';
// import { UsersPage } from './components/UsersPage';

import Link from 'next/link';
import { LinkButton } from './components/LinkButton';
// import { AnimeList } from './components/AnimeList';

export default function Home() {
	return (
		<>
			{/* <TodoList /> */}
			{/* <UsersPage /> */}
			{/* <AnimeList /> */}
			<main className='flex p-8 gap-4 flex-wrap justify-center'>
				<LinkButton text='Todo List' url='/todos' color='pink' />
				<LinkButton text='Users Page' url='/users' color='orange' />
				<LinkButton text='Anime List' url='/anime' color='purple' />
			</main>
		</>
	);
}
