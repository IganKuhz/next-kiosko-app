import { OrderWithProducts } from '@/src/types/index';

type LatestOrderProps = {
	order: OrderWithProducts;
};

export default function LatestOrder({ order }: LatestOrderProps) {
	return (
		<div className='rounded-lg bg-yellow-100 p-5 shadow-md'>
			<h2 className='text-xl font-bold text-black'>Orden {order.id}</h2>
			<h2 className='text-md font-semibold'>Cliente: {order.name}</h2>
			<ul className='mt-5 text-sm text-black'>
				{order.orderProducts.map(orderProduct => (
					<li
						key={orderProduct.id}
						className='flex items-center justify-between'
					>
						<p>{orderProduct.product.name}</p>
						<p>{orderProduct.quantity}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
