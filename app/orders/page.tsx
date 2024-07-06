'use client';

import LatestOrder from '@/components/order/LatestOrder';
import Logo from '@/components/ui/Logo';
import { OrderWithProducts } from '@/src/types/index';
import useSWR from 'swr';

export default function OrdersPage() {
	const url = '/orders/api';

	const fetcher = () =>
		fetch(url)
			.then(res => res.json())
			.then(data => data);

	const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
		refreshInterval: 60000,
		revalidateOnFocus: false,
	});

	if (isLoading) return <p>Loading...</p>;

	if (data)
		return (
			<>
				<h1 className='mt-20 text-center text-6xl font-black'>OrdersPage</h1>

				<div className='mx-auto flex w-96 items-center justify-center rounded-full p-5'>
					<Logo />
				</div>

				{data.length ? (
					<div className='mt-10 grid auto-rows-fr grid-cols-1 items-start gap-4 px-10 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
						{data.map(order => (
							<LatestOrder
								key={order.id}
								order={order}
							/>
						))}
					</div>
				) : (
					<p className='my-10 text-center text-black'>
						No hay orders pendientes
					</p>
				)}
			</>
		);
}
