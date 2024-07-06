import { Product } from '@prisma/client';
import { create } from 'zustand';
import { OrderItem } from './types';

interface Store {
	order: OrderItem[];
	addToOrder: (product: Product) => void;
	increaseQuantity: (id: Product['id']) => void;
	decreaseQuantity: (id: Product['id']) => void;
	removeProduct: (id: Product['id']) => void;
	clearOrder: () => void;
}

export const useStore = create<Store>((set, get) => ({
	order: [],
	addToOrder: product => {
		// extract the categoryId and image from the product
		const { categoryId, image, ...data } = product;
		let order: OrderItem[] = [];

		if (get().order.find(item => item.id === product.id)) {
			// if the product is already in the order, increase the quantity
			order = get().order.map(item =>
				item.id === product.id
					? {
							...item,
							quantity: item.quantity + 1,
							subtotal: item.subtotal + item.price,
						}
					: item,
			);
		} else {
			// if the product is not in the order, add it
			order = [
				...get().order,
				{
					...data,
					quantity: 1,
					subtotal: data.price,
				},
			];
		}

		set(() => ({
			order,
		}));
	},
	increaseQuantity: id => {
		const order = get().order.map(item =>
			item.id === id
				? {
						...item,
						quantity: item.quantity + 1,
						subtotal: item.subtotal + item.price,
					}
				: item,
		);

		set(() => ({
			order,
		}));
	},
	decreaseQuantity: id => {
		// if the quantity is 1, remove the product from the order
		if (get().order.find(item => item.id === id)?.quantity === 1) {
			const order = get().order.filter(item => item.id !== id);

			set(() => ({
				order,
			}));

			return;
		}

		// if the quantity is greater than 1, decrease the quantity
		const order = get().order.map(item =>
			item.id === id
				? {
						...item,
						quantity: item.quantity - 1,
						subtotal: item.subtotal - item.price,
					}
				: item,
		);

		set(() => ({
			order,
		}));
	},
	removeProduct: id => {
		const order = get().order.filter(item => item.id !== id);

		set(() => ({
			order,
		}));
	},
	clearOrder: () => {
		set(() => ({
			order: [],
		}));
	},
}));
