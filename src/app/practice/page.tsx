import { LinkButton } from "@/components/LinkButton";

export default function Practice() {
	return (
		<div className='flex gap-4 flex-wrap justify-center'>
			{/* <LinkButton text='Todo List' url='/practice/todos' color='bg-pink-900' /> */}
			<LinkButton text='Anime List' url='/practice/anime' color='bg-purple-900' />
			<LinkButton text='Reducer' url='/practice/reducer' color='bg-red-900' />
			<LinkButton text='Memo' url='/practice/memo' color='bg-blue-800' />
			<LinkButton text='Context' url='/practice/context' color='bg-yellow-900' />
		</div>
	);
}
