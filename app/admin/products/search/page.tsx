import ProductSearchForm from '@/components/products/ProductSearchForm';
import ProductTable from '@/components/products/ProductTable';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

async function searchProduct(searchTerm: string) {
	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: searchTerm,
				mode: 'insensitive',
			},
		},
		include: {
			category: true,
		},
	});
	return products;
}

export default async function SearchPage({
	searchParams,
}: {
	searchParams: { search: string };
}) {
	const products = await searchProduct(searchParams.search);
	return (
		<>
			<Heading>
				Resultados de la busqueda:{' '}
				<span className='italic'>{searchParams.search}</span>
			</Heading>
			<ProductSearchForm />

			{products.length === 0 ? (
				<div className='mt-5 flex h-[calc(100vh-180px)] items-center justify-center'>
					<p>No hay resultados.</p>
				</div>
			) : (
				<ProductTable products={products} />
			)}
		</>
	);
}
