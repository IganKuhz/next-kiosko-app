'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AdminIconProps = {
	link: {
		url: string;
		text: string;
		blank: boolean;
	};
};

export default function AdminIcon({ link }: AdminIconProps) {
	const pathname = usePathname();
	const isActive = pathname.startsWith(link.url);

	return (
		<div className='rounded border-l-2 border-yellow-700 px-1'>
			<Link
				href={link.url}
				target={link.blank ? '_blank' : ''}
				className={`flex items-center space-x-2 rounded-md px-2 py-2 font-semibold uppercase transition-all duration-300 hover:bg-amber-500 hover:px-4 hover:text-stone-800 hover:shadow-md ${isActive ? 'bg-amber-400 shadow-md' : ''}`}
			>
				<p>{link.text}</p>
			</Link>
		</div>
	);
}
