import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import CategoryIcon from '../ui/CategoryIcon';
import Logo from '../ui/Logo';

async function getCategories() {
	return await prisma.category.findMany();
}

export default async function OrderSidebar() {
	const categories = await getCategories();

	return (
		<>
			<aside className='m-4 h-[calc(100dvh-32px)] w-64 rounded-md bg-amber-100 p-4 text-black'>
				<Logo />
				<h1 className='mb-4 text-center font-black uppercase'>Menú</h1>
				<nav className='flex h-[calc(100dvh-300px)] flex-col justify-between'>
					<div className='flex flex-col justify-between gap-4'>
						{categories.map(category => (
							<CategoryIcon
								key={category.id}
								category={category}
							/>
						))}
					</div>

					<section className='flex flex-col justify-end gap-4'>
						<Link
							href='/admin/orders'
							className='rounded-md px-2 py-2 text-center font-semibold uppercase transition-all duration-300 hover:bg-amber-500 hover:text-stone-800 hover:shadow-md'
						>
							<p>Ordenes y Productos</p>
						</Link>
					</section>
				</nav>
			</aside>
		</>
	);
}
