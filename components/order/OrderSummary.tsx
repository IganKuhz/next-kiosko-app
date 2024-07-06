'use client';

import { createOrder } from '@/actions';
import { OrderSchema } from '@/src/schema';
import { useStore } from '@/src/store';
import { formatCurrency } from '@/src/utils';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import ProductsDetails from './ProductsDetails';

export default function OrderSummary() {
	const order = useStore(state => state.order);
	const clearOrder = useStore(state => state.clearOrder);

	const total = useMemo(
		() => order.reduce((total, item) => total + item.price * item.quantity, 0),
		[order],
	);

	const handleConfirm = async (formData: FormData) => {
		const data = {
			name: formData.get('name'),
			total,
			order,
		};

		// Validate the data from client
		const result = OrderSchema.safeParse(data);
		console.log(result);

		if (!result.success) {
			console.log(
				result.error.issues.forEach(issue => {
					toast.error(issue.message);
				}),
			);
			return;
		}

		// Validate the data from server
		const response = await createOrder(data);
		console.log('from server', response);

		if (response?.errors) {
			response.errors.forEach(issue => {
				toast.error(issue.message);
			});
		}

		toast.success('Pedido confirmado');
		clearOrder();
	};

	return (
		<>
			<aside className='m-4 flex h-[calc(100vh-32px)] w-72 flex-col justify-between rounded-md bg-yellow-100 p-4 lg:overflow-y-scroll'>
				<h1 className='text-center text-2xl font-bold'>Mi pedido</h1>

				{order.length === 0 ? (
					<p className='my-10 text-center text-black'>
						No hay productos en tu pedido.
					</p>
				) : (
					<div className='my-5 h-full w-full space-y-4 self-start overflow-y-scroll p-2 text-black'>
						{order.map(item => (
							<ProductsDetails
								key={item.id}
								item={item}
							/>
						))}
					</div>
				)}
				<div>
					{order.length > 0 && (
						<>
							<p className='text-md my-2 text-right font-bold text-black'>
								Total: {formatCurrency(total)}
							</p>

							<form
								className='w-full space-y-2'
								action={handleConfirm}
							>
								<input
									type='text'
									placeholder='Tu nombre'
									name='name'
									className='w-full rounded-md bg-white p-2 text-black placeholder:font-light'
								/>

								<input
									type='submit'
									className='w-full rounded-md bg-amber-400 px-6 py-2 font-semibold uppercase text-black transition-all duration-300 hover:cursor-pointer hover:bg-amber-500'
									value='Confirmar pedido'
								/>
							</form>
						</>
					)}
				</div>
			</aside>
		</>
	);
}
