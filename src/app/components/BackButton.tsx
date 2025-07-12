'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
	text?: string;
	color?: string;
	full?: boolean;
}

export const BackButton = ({ text = 'Volver', color = 'blue', full = false }: BackButtonProps) => {
	const router = useRouter();
	return (
		<button
			onClick={() => router.back()}
			className={`px-4 py-2 rounded bg-${color}-900 ${!full && 'w-fit'}  flex place-items-center cursor-pointer`}
		>
			{text}
		</button>
	);
};
