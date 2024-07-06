'use client';

import { useStore } from '@/src/store';
import { Product } from '@prisma/client';

type AddProductBtnProps = {
	product: Product;
};

export default function AddProductBtn({ product }: AddProductBtnProps) {
	const addToOrder = useStore(state => state.addToOrder);

	return (
		<button
			className='rounded-md bg-amber-400 px-6 py-2 text-sm font-semibold uppercase text-black transition-all duration-300 hover:bg-amber-500'
			onClick={() => addToOrder(product)}
		>
			Agregar
		</button>
	);
}
