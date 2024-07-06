'use client';
import { getImagePath } from '@/src/utils';
import { ImageUp } from 'lucide-react';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageUpload({ image }: { image: string | undefined }) {
	const [imageUrl, setImageUrl] = useState('');

	return (
		<CldUploadWidget
			uploadPreset='q1nrrdpy'
			onSuccess={(result, { widget }) => {
				if (result.event === 'success') {
					const info = result.info as CloudinaryUploadWidgetInfo;
					setImageUrl(info.secure_url);
				}
				// widget.close();
			}}
			options={{
				maxFiles: 1,
			}}
		>
			{({ open }) => (
				<>
					<div className='space-y-2'>
						<label
							className='font-semibold text-slate-800'
							htmlFor='image'
						>
							Imagen:
						</label>

						<div
							onClick={() => open()}
							className='relative flex h-32 max-h-48 cursor-pointer flex-col items-center justify-center gap-4 rounded-md bg-white transition-all hover:ring-2 hover:ring-amber-500'
						>
							<ImageUp size={32} />
							<p>Agregar imagen</p>

							{imageUrl && (
								<div className='absolute inset-0 h-full w-full'>
									<Image
										fill
										src={imageUrl}
										alt='Producto'
										style={{
											objectFit: 'contain',
										}}
									/>
								</div>
							)}
						</div>
					</div>

					{image && !imageUrl && (
						<div className='flex flex-col items-center justify-center space-y-2'>
							<label className='self-start font-semibold text-slate-800'>
								Imagen actual:
							</label>
							<div className='relative h-48 w-48 max-w-48'>
								<Image
									fill
									src={getImagePath(image)}
									alt='Producto'
								/>
							</div>
						</div>
					)}

					<input
						type='hidden'
						name='image'
						defaultValue={imageUrl ? imageUrl : image}
					/>
				</>
			)}
		</CldUploadWidget>
	);
}
