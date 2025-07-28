import { LinkButton } from './LinkButton';

export const Navbar = () => {
	return (
		<nav className='flex gap-4 bg-gray-800 border-b border-gray-600 px-4 py-3 '>
			<LinkButton text='Volver al Inicio' url='/' />
			<LinkButton text='Practice' url='/practice' color='bg-pink-900' />
			<LinkButton text='Todo App' url='/todoapp' color='bg-green-900' />
			{/* <LinkButton text='Anime List' url='/anime' color='bg-purple-900' /> */}
			{/* <LinkButton text='Reducer' url='/reducer' color='bg-red-900' /> */}
			{/* <LinkButton text='Memo' url='/memo' color='bg-blue-800' /> */}
			{/* <LinkButton text='Todo App' url='/todoapp' color='bg-green-900' /> */}
		</nav>
	);
};
