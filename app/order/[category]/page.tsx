import ProductCard from '@/components/products/ProductCard';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

async function getProductbyCategory(category: string) {
	const products = await prisma.product.findMany({
		where: {
			category: {
				slug: category,
			},
		},
	});
	return products;
}

export default async function OrderPage({
	params,
}: {
	params: { category: string };
}) {
	const products = await getProductbyCategory(params.category);

	return (
		<>
			<Heading>Personaliza tu pedido</Heading>

			<div className='grid auto-rows-fr grid-cols-1 items-start gap-4 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
				{products.map(product => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
			</div>
		</>
	);
}
