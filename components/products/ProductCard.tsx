import { formatCurrency, getImagePath } from '@/src/utils';
import { Product } from '@prisma/client';
import Image from 'next/image';
import AddProductBtn from './AddProductBtn';

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	const imagePath = getImagePath(product.image);
	return (
		<>
			<article className='flex h-full flex-col rounded-xl bg-amber-100 text-black shadow-lg'>
				<Image
					src={imagePath}
					alt={product.name}
					width={0}
					height={0}
					quality={75}
					sizes='100vw'
					style={{
						width: '100%',
						height: 'auto',
						objectFit: 'cover',
						objectPosition: 'center',
					}}
					className='rounded-t-xl'
				/>
				<div className='h-full p-4'>
					<h2 className='text-center text-xl font-bold'>{product.name}</h2>
				</div>

				<div className='mx-auto mb-4 rounded-md bg-stone-700 px-6 py-2 font-bold text-yellow-500'>
					{formatCurrency(product.price)}
				</div>

				<div className='self-end p-4'>
					<AddProductBtn product={product} />
				</div>
			</article>
		</>
	);
}
