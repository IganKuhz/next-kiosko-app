import { Order, OrderProducts, Product } from '@prisma/client';
import { z } from 'zod';

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
	quantity: number;
	subtotal: number;
};

export type OrderWithProducts = Order & {
	orderProducts: (OrderProducts & {
		product: Product;
	})[];
};

export const OrderIdSchema = z.object({
	orderId: z
		.string()
		.transform(value => parseInt(value))
		.refine(value => value > 0, {
			message: 'Order ID must be a positive number',
		}),
});

export const ProductIdSchema = z.object({
	productId: z
		.string()
		.transform(value => parseInt(value))
		.refine(value => value > 0, {
			message: 'Product ID must be a positive number',
		}),
});
