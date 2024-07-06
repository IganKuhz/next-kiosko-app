import Heading from '@/components/ui/Heading';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex h-screen flex-col items-center justify-center'>
			<Heading>Producto no encontrado</Heading>
			<Link
				href='/admin/products'
				className='mt-2 rounded-md bg-amber-400 px-6 py-2 text-sm font-semibold uppercase text-black transition-all duration-300 hover:bg-amber-500'
			>
				Volver a la lista de productos
			</Link>
		</div>
	);
}
