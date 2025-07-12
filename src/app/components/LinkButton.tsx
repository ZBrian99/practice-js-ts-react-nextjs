import Link from 'next/link';

interface LinkButtonProps {
	text: string;
	url: string;
	color?: string;
	full?: boolean;
}

export const LinkButton = ({ text, url, color = 'blue', full = false }: LinkButtonProps) => {
	return (
		<Link href={url} className={`px-4 py-2 rounded bg-${color}-900 ${!full && 'w-fit'} flex place-items-center`}>
			{text}
		</Link>
	);
};
