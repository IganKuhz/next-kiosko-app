import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';

type ProductsPaginationProps = {
	currPage: number;
	totalPages: number;
};

export default function ProductsPagination({
	currPage,
	totalPages,
}: ProductsPaginationProps) {
	// number of pages
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<>
			<nav className='flex items-center justify-end gap-x-4 py-10 text-amber-400'>
				{currPage > 1 && (
					<Link
						href={`/admin/products?page=${currPage - 1}`}
						className='transition-all duration-300 hover:text-amber-600'
					>
						<ArrowLeftCircle />
					</Link>
				)}

				{pages.map(page => (
					<Link
						key={page}
						href={`/admin/products?page=${page}`}
						className={`text-lg transition-all duration-300 hover:text-amber-600 ${
							currPage === page
								? 'font-bold text-amber-600 underline'
								: 'font-semibold'
						}`}
					>
						{page}
					</Link>
				))}

				{currPage < totalPages && (
					<Link
						href={`/admin/products?page=${currPage + 1}`}
						className='transition-all duration-300 hover:text-amber-600'
					>
						<ArrowRightCircle />
					</Link>
				)}
			</nav>
		</>
	);
}
