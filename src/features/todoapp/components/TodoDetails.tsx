import { useEffect, useRef } from 'react';
import { Todo } from '../type/todoTypes';
import { useFeatureContext } from '@/context/featureContext';

// export const TodoDetail = () => {
export const TodoDetail = ({
	todo,
	// setIsOpenDetails,
	isOpenDetails,
	ref,
}: // isOpenDetails,
// handleOpenDetails,
{
	todo: Todo | null;
	isOpenDetails: boolean;
	ref: React.Ref<HTMLDivElement>;
	// setIsOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) =>
	// 	ref,
	// setOpen,

	// {
	// id: id | null;
	// isOpenDetails: boolean;
	// handleOpenDetails: (open: boolean) => void;
	// }
	{
		return (
			<section
				ref={ref}
				className={`fixed top-16 right-0 bg-gray-700 p-4 max-w-full w-xl h-[calc(100vh-4rem)] transition-transform duration-300 ${
					isOpenDetails ? '' : 'translate-x-full'
					// state.ui.isidView ? '' : 'translate-x-full'
				}`}
			>
				{todo && todo.title}
			</section>
		);
	};
