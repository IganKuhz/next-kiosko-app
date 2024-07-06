import { useStore } from '@/src/store';
import { OrderItem } from '@/src/types/index';
import { formatCurrency } from '@/src/utils';
import { MinusIcon, PlusIcon, X } from 'lucide-react';
import { useMemo } from 'react';

type ProductDetailsProps = {
	item: OrderItem;
};
const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export default function ProductsDetails({ item }: ProductDetailsProps) {
	const increseQuantity = useStore(state => state.increaseQuantity);
	const decreaseQuantity = useStore(state => state.decreaseQuantity);
	const removeItem = useStore(state => state.removeProduct);

	const disableIncrease = useMemo(() => item.quantity === MAX_ITEMS, [item]);
	const disableDecrease = useMemo(() => item.quantity === MIN_ITEMS, [item]);

	return (
		<>
			<div className='relative flex flex-col items-center justify-center rounded-md bg-amber-300 p-2 shadow-md'>
				<button
					type='button'
					onClick={() => {
						removeItem(item.id);
					}}
					className='absolute -right-2 -top-2 cursor-pointer rounded-full bg-red-500 text-white shadow-md transition-all hover:bg-red-600'
				>
					<X size={22} />
				</button>

				<h2 className='text-xl font-black text-black'>{item.name}</h2>
				<p className='py-1 text-xl font-semibold'>
					{formatCurrency(item.price)}
				</p>

				<div className='flex w-fit gap-5 rounded-md bg-gray-100'>
					<button
						type='button'
						disabled={disableDecrease}
						onClick={() => {
							decreaseQuantity(item.id);
						}}
						className='rounded-l-md p-2 transition-all hover:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-300'
					>
						<MinusIcon className='h-4 w-4' />
					</button>
					<p className='text-lg font-black'>{item.quantity}</p>
					<button
						type='button'
						disabled={disableIncrease}
						onClick={() => {
							increseQuantity(item.id);
						}}
						className='rounded-r-md p-2 transition-all hover:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-300'
					>
						<PlusIcon className='h-4 w-4' />
					</button>
				</div>

				<p className='text-lg font-black'>
					Subtotal: {''}
					<span className='font-normal'>{formatCurrency(item.subtotal)}</span>
				</p>
			</div>
		</>
	);
}
