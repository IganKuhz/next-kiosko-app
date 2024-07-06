'use server';

import { prisma } from '@/src/lib/prisma';
import { OrderSchema, ProductSchema } from '@/src/schema';
import { OrderIdSchema, ProductIdSchema } from '@/src/types/index';
import { revalidatePath } from 'next/cache';

export async function createOrder(data: unknown) {
	const result = OrderSchema.safeParse(data);

	if (!result.success) {
		return {
			errors: result.error.issues,
		};
	}

	try {
		await prisma.order.create({
			data: {
				name: result.data.name,
				total: result.data.total,
				orderProducts: {
					create: result.data.order.map(product => ({
						productId: product.id,
						quantity: product.quantity,
					})),
				},
			},
		});
	} catch (error) {
		console.log(error);
	}
}

export async function completeOrder(formData: FormData) {
	const data = {
		orderId: formData.get('order_id'),
	};
	const res = OrderIdSchema.safeParse(data);

	if (res.success) {
		try {
			await prisma.order.update({
				where: {
					id: res.data.orderId,
				},
				data: {
					status: true,
					readyAt: new Date(Date.now()),
				},
			});
			revalidatePath('/admin/orders');
		} catch (error) {
			console.log(error);
		}
	}
}

export async function createProduct(data: unknown) {
	const res = ProductSchema.safeParse(data);
	if (!res.success) {
		return {
			errors: res.error.issues,
		};
	}
	await prisma.product.create({
		data: res.data,
	});
}

export async function updateProduct(data: unknown, id: number) {
	const res = ProductSchema.safeParse(data);
	if (!res.success) {
		return {
			errors: res.error.issues,
		};
	}

	await prisma.product.update({
		where: {
			id: id,
		},
		data: res.data,
	});
	revalidatePath('/admin/products');
}

export async function deleteProduct(formData: FormData) {
	const data = {
		productId: formData.get('product_id'),
	};
	const res = ProductIdSchema.safeParse(data);

	if (res.success) {
		try {
			await prisma.product.delete({
				where: {
					id: res.data.productId,
				},
			});
			revalidatePath('/admin/products');
		} catch (error) {
			console.log(error);
		}
	}
}
