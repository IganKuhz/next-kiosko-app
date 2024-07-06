import { completeOrder } from '@/actions';
import { OrderWithProducts } from '@/src/types/index';
import { formatCurrency } from '@/src/utils';

type OrderCardProps = {
	order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
	return (
		<section
			aria-labelledby='summary-heading'
			className='mt-16 space-y-2 rounded-lg bg-amber-100 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8'
		>
			<p className='text-xl font-black text-gray-900'>Cliente: {order.name}</p>

			<p className='text-md font-medium text-gray-900'>Productos Ordenados:</p>
			<dl className='space-y-2'>
				{order.orderProducts.map(product => (
					<div
						key={product.id}
						className='flex h-full items-center gap-2 border-t border-gray-400 pt-2 text-xs font-medium text-gray-900'
					>
						<dt>
							<span>{product.quantity} x</span>
						</dt>
						<dd>{product.product.name}</dd>
					</div>
				))}

				<div className='flex items-center justify-between border-t border-gray-400 pt-4'>
					<dt className='text-base font-medium text-gray-900'>
						Total a Pagar:
					</dt>
					<dd className='text-base font-bold text-gray-900'>
						{formatCurrency(order.total)}
					</dd>
				</div>
			</dl>

			<form action={completeOrder}>
				<input
					type='hidden'
					value={order.id}
					name='order_id'
				/>
				<input
					type='submit'
					className='mt-4 w-full cursor-pointer rounded-md bg-amber-400 p-3 text-sm font-semibold uppercase text-black transition-all duration-300 hover:bg-amber-500'
					value='Marcar Orden Completada'
				/>
			</form>
		</section>
	);
}
