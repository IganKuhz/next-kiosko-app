'use client';

import { updateProduct } from '@/actions';
import { ProductSchema } from '@/src/schema';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function EditProductForm({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const params = useParams();
	const id = +params.id!;

	const handleSubmit = async (formData: FormData) => {
		const data = {
			name: formData.get('name'),
			price: formData.get('price'),
			categoryId: formData.get('categoryId'),
			image: formData.get('image'),
		};

		// validate data with ProductSchema
		const res = ProductSchema.safeParse(data);
		if (!res.success) {
			res.error.issues.forEach(issue => {
				toast.error(issue.message);
			});
			return;
		}

		const resp = await updateProduct(res.data, id);
		if (resp?.errors) {
			resp.errors.forEach(issue => {
				toast.error(issue.message);
			});
			return;
		}
		toast.success('Producto agregado correctamente');
		router.push('/admin/products');
	};

	return (
		<>
			<div className='mx-auto mt-4 max-w-3xl rounded-md bg-amber-100 p-10 text-black shadow-md'>
				<form
					className='flex w-full flex-col space-y-5'
					action={handleSubmit}
				>
					{children}
					<input
						type='submit'
						value='Guardar cambios'
						className='self-end rounded-md bg-amber-400 px-6 py-2 font-semibold uppercase text-black transition-all duration-300 hover:cursor-pointer hover:bg-amber-500'
					/>
				</form>
			</div>
		</>
	);
}
