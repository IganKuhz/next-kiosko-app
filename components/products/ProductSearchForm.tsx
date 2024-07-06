'use client';
import { SearchSchema } from '@/src/schema';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ProductSearchForm() {
	const handleSearchForm = (formData: FormData) => {
		const data = {
			search: formData.get('search'),
		};
		const res = SearchSchema.safeParse(data);
		if (!res.success) {
			res.error.issues.forEach(issue => {
				toast.error(issue.message);
			});
			return;
		}
		redirect(`/admin/products/search?search=${res.data.search}`);
	};

	return (
		<>
			<form
				action={handleSearchForm}
				className='flex w-96 items-center gap-4'
			>
				<input
					type='text'
					placeholder='Buscar producto'
					name='search'
					className='w-full rounded-md border border-gray-300 p-2 text-black'
				/>
				<input
					type='submit'
					value='Buscar'
					className='cursor-pointer rounded-md bg-amber-400 p-3 text-sm font-semibold uppercase text-black transition-all duration-300 hover:bg-amber-500'
				/>
			</form>
		</>
	);
}
