import { prisma } from '@/src/lib/prisma';
import { Product } from '@prisma/client';
import ImageUpload from './ImageUpload';

async function getCategories() {
	return await prisma.category.findMany();
}

type ProductFormProps = {
	product?: Product;
};

export default async function ProductForm({ product }: ProductFormProps) {
	const categories = await getCategories();

	return (
		<>
			<div className='space-y-2'>
				<label
					className='font-semibold text-slate-800'
					htmlFor='name'
				>
					Nombre:
				</label>
				<input
					id='name'
					type='text'
					name='name'
					className='w-full rounded-md bg-white p-2 text-black transition-all placeholder:font-light focus:outline-none focus:ring-2 focus:ring-amber-500'
					placeholder='Nombre Producto'
					defaultValue={product?.name}
				/>
			</div>

			<div className='space-y-2'>
				<label
					className='font-semibold text-slate-800'
					htmlFor='price'
				>
					Precio:
				</label>
				<input
					id='price'
					name='price'
					className='w-full rounded-md bg-white p-2 text-black transition-all placeholder:font-light focus:outline-none focus:ring-2 focus:ring-amber-500'
					placeholder='Precio Producto'
					defaultValue={product?.price}
				/>
			</div>

			<div className='space-y-2'>
				<label
					className='font-semibold text-slate-800'
					htmlFor='categoryId'
				>
					Categoría:
				</label>
				<select
					className='w-full rounded-md bg-white p-2 text-black transition-all focus:outline-none focus:ring-2 focus:ring-amber-500'
					id='categoryId'
					name='categoryId'
					defaultValue={product?.categoryId}
				>
					<option value=''>-- Seleccione --</option>
					{categories.map(category => (
						<option
							key={category.id}
							value={category.id}
						>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<ImageUpload image={product?.image} />
		</>
	);
}