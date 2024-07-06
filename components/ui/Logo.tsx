import Image from 'next/image';

export default function Logo() {
	return (
		<div className='mt-5 flex justify-center'>
			<div className='relative h-40 w-32'>
				<Image
					fill
					alt='Next Coffee Lounge'
					src='/logo.svg'
				/>
			</div>
		</div>
	);
}
