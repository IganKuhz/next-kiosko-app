'use client';

import { Category } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type CategoryIconProps = {
	category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
	const params = useParams();

	return (
		<div className='rounded border-l-2 border-yellow-700 px-1'>
			<Link
				href={`/order/${category.slug}`}
				className={`flex ${category.slug === params.category ? 'bg-amber-400 shadow-md' : ''} items-center space-x-2 rounded-md px-2 py-2 font-semibold uppercase transition-all duration-300 hover:bg-amber-500 hover:px-4 hover:text-stone-800 hover:shadow-md`}
			>
				<div className='relative h-8 w-8'>
					<Image
						fill
						src={`/icon_${category.slug}.svg`}
						alt={category.name}
					/>
				</div>
				<p>{category.name}</p>
			</Link>
		</div>
	);
}
