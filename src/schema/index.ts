import { z } from 'zod';

export const OrderSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
	total: z.number().min(1, { message: 'El total debe ser mayor a 0' }),
	order: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			price: z.number(),
			quantity: z.number(),
			subtotal: z.number(),
		}),
	),
});

export const SearchSchema = z.object({
	search: z
		.string()
		.trim()
		.min(2, { message: 'La búsqueda debe tener al menos 2 caracteres' }),
});

export const ProductSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, { message: 'El nombre del producto no puede ir vacio' }),
	price: z
		.string()
		.trim()
		.transform(value => parseFloat(value))
		.refine(value => value > 0, { message: 'Precio no válido' })
		.or(z.number().min(1, { message: 'La categoría es obligatoria' })),
	categoryId: z
		.string()
		.trim()
		.transform(value => parseInt(value))
		.refine(value => value > 0, { message: 'La categoría es obligatoria' })
		.or(z.number().min(1, { message: 'La categoría es obligatoria' })),
	image: z.string().min(1, { message: 'La imagen es obligatoria' }),
});
