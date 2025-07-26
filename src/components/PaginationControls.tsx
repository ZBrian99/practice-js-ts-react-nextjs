export const PaginationControls = ({
	currentPage,
	hasNextPage,
	onPageChange,
}: {
	currentPage: number;
	hasNextPage: boolean;
	onPageChange: (page: number) => void;
}) => (
	<div className='flex justify-center gap-4'>
		<button
			disabled={currentPage <= 1}
			onClick={() => onPageChange(currentPage - 1)}
			className={`${currentPage <= 1 ? 'text-gray-400' : 'cursor-pointer'}`}
		>
			Prev
		</button>
		<span>{currentPage}</span>
		<button
			disabled={!hasNextPage}
			onClick={() => onPageChange(currentPage + 1)}
			className={`${!hasNextPage ? 'text-gray-400' : 'cursor-pointer'}`}
		>
			Next
		</button>
	</div>
);
