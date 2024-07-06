'use client';
import { useRouter } from 'next/navigation';

export default function GoBackBtn() {
	const router = useRouter();
	return (
		<>
			<button
				onClick={() => router.back()}
				className='mt-4 w-full cursor-pointer rounded-md bg-amber-400 p-3 text-sm font-semibold uppercase text-black transition-all duration-300 hover:bg-amber-500'
			>
				Volver
			</button>
		</>
	);
}
