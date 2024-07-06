import EditProductForm from '@/components/products/EditProductForm';
import ProductForm from '@/components/products/ProductForm';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';
import { notFound } from 'next/navigation';
import GoBackBtn from '../../../../../components/ui/GoBackBtn';

async function getProductById(id: number) {
	const product = await prisma.product.findUnique({
		where: {
			id,
		},
	});

	if (!product) {
		notFound();
	}
	return product;
}

export default async function EditProduct({
	params,
}: {
	params: { id: string };
}) {
	const product = await getProductById(+params.id);
	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading>Editar producto: {product.name}</Heading>
				<div>
					<GoBackBtn />
				</div>
			</div>

			<EditProductForm>
				<ProductForm product={product} />
			</EditProductForm>
		</>
	);
}
