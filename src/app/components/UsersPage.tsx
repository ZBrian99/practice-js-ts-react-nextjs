'use client';

import { JSX, useEffect, useState } from 'react';

type User = {
	id: number;
	name: string;
	email: string;
};

type PaginatedUsers = {
	users: User[];
	page: number;
	totalPages: number;
	pageItems: number;
};

const PAGE_ITEMS = 3;

export const usersMock: User[] = [
	{ id: 1, name: 'Juan Pérez', email: 'juan.perez@email.com' },
	{ id: 2, name: 'María García', email: 'maria.garcia@email.com' },
	{ id: 3, name: 'Carlos López', email: 'carlos.lopez@email.com' },
	{ id: 4, name: 'Ana Torres', email: 'ana.torres@email.com' },
	{ id: 5, name: 'Luis Fernández', email: 'luis.fernandez@email.com' },
	{ id: 6, name: 'Sofía Martínez', email: 'sofia.martinez@email.com' },
	{ id: 7, name: 'Miguel Sánchez', email: 'miguel.sanchez@email.com' },
	{ id: 8, name: 'Lucía Romero', email: 'lucia.romero@email.com' },
	{ id: 9, name: 'Pedro Ruiz', email: 'pedro.ruiz@email.com' },
	{ id: 10, name: 'Elena Gómez', email: 'elena.gomez@email.com' },
];

export const userFetch = async (page = 1): Promise<PaginatedUsers> => {
	return new Promise((res, rej) =>
    setTimeout(() => {
      console.log('server')
			if (Math.random() < 0.15) return rej(new Error('Hubo un error con el servidor'));
			const totalPages = Math.ceil(usersMock.length / PAGE_ITEMS);
			if (page > totalPages) page = totalPages;
			const paginatedUsers = usersMock.slice((page - 1) * PAGE_ITEMS, page * PAGE_ITEMS);

			res({
				users: paginatedUsers,
				page: Math.min(page, totalPages),
				totalPages,
				pageItems: paginatedUsers.length,
			});
		}, 200)
	);
};

interface UserListProps {
	data: PaginatedUsers | null;
	isLoading: boolean;
	error: string;
}

export const UserList = ({ data, isLoading, error }: UserListProps): JSX.Element => {
	if (error) return <div>{error}</div>;
	if (isLoading) return <div>Cargando...</div>;
	if (data?.users?.length === 0) return <div>No se encontraron usuarios</div>;
	if (!data) return <div>Ocurrio un error inesperado, intente recargar</div>;

	return <ul>{data.users && data.users.map((user) => <li key={user.id}>{`${user.name} - ${user.email}`}</li>)}</ul>;
};

export const UsersPage = (): JSX.Element => {
	const [data, setData] = useState<PaginatedUsers | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [page, setPage] = useState(1);

	const getUsers = async (page: number) => {
		try {
      setIsLoading(true);
      setError('')
			const data = await userFetch(page);
			setData(data);
			setPage(data.page);
			setIsLoading(false);
		} catch (error) {
			if (error instanceof Error) setError(error.message);
			else throw error;
		}
	};

	useEffect(() => {
		getUsers(page);
	}, []);

	const handleCurrentPage = (action: 'prev' | 'next') => {
		if (!action) return;

		if (action === 'prev' && page > 1) {
			getUsers(page - 1);
		}

		if (action === 'next' && data && page < data?.totalPages) {
			getUsers(page + 1);
		}
	};

	return (
		<div className='flex flex-col w-full min-h-screen gap-4 p-4'>
			<UserList data={data} isLoading={isLoading} error={error} />
			<div className='flex gap-4 mx-auto mt-auto '>
				<button
					onClick={() => handleCurrentPage('prev')}
					className={`${page === 1 ? 'text-gray-500' : 'text-white cursor-pointer'} `}
					disabled={page === 1}
				>
					prev
				</button>
				<div>{page}</div>
				<button
					onClick={() => handleCurrentPage('next')}
					className={`${data && page >= data?.totalPages ? 'text-gray-500' : 'text-white cursor-pointer'}`}
					disabled={!!data && page >= data?.totalPages}
				>
					next
				</button>
			</div>
		</div>
	);
};
