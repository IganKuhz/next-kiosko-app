import ProductSearchForm from '@/components/products/ProductSearchForm';
import ProductsPagination from '@/components/products/ProductsPagination';
import ProductTable from '@/components/products/ProductTable';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function productCount() {
	return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
	const skip = (page - 1) * pageSize;

	const products = await prisma.product.findMany({
		take: pageSize,
		skip,
		include: {
			category: true,
		},
	});
	return products;
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: { page: string };
}) {
	const page = +searchParams.page || 1;
	const pageSize = 10;
	// prevent negative page numbers
	if (page < 0) redirect('/admin/products');

	const productsData = await getProducts(page, pageSize);
	const totalProductsData = await productCount();
	const [products, totalProducts] = await Promise.all([
		productsData,
		totalProductsData,
	]);
	const totalPages = Math.ceil(totalProducts / pageSize);

	// prevent page numbers greater than the total number of pages
	if (page > totalPages) redirect('/admin/products');

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading>Administrar Productos</Heading>
				<div>
					<Link
						href='/admin/products/new'
						className='mt-4 w-full cursor-pointer rounded-md bg-amber-400 p-3 text-sm font-semibold uppercase text-black transition-all duration-300 hover:bg-amber-500'
					>
						Agregar Producto
					</Link>
				</div>
			</div>

			<ProductSearchForm />

			<ProductTable products={products} />
			<ProductsPagination
				currPage={page}
				totalPages={totalPages}
			/>
		</>
	);
}
