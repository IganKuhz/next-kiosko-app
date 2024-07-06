'use client';
import OrderCard from '@/components/order/OrderCard';
import Heading from '@/components/ui/Heading';
import { OrderWithProducts } from '@/src/types/index';
import useSWR from 'swr';

export default function OrdersPage() {
	const url = '/admin/orders/api';

	const fetcher = () =>
		fetch(url)
			.then(res => res.json())
			.then(data => data);

	const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
		refreshInterval: 10000,
		revalidateOnFocus: false,
	});

	if (isLoading) return <p>Loading...</p>;

	if (data)
		return (
			<>
				<div className='flex items-center justify-between'>
					<Heading>Orderes</Heading>
				</div>

				{data.length ? (
					<div className='mt-10 grid auto-rows-fr grid-cols-1 items-start gap-4 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
						{data.map(order => (
							<OrderCard
								key={order.id}
								order={order}
							/>
						))}
					</div>
				) : (
					<p className='my-10 text-center italic text-amber-400'>
						No hay ordenes pendientes.
					</p>
				)}
			</>
		);
}
