import { ReactNode } from 'react';

type HeadingProps = {
	children: ReactNode;
};

export default function Heading({ children }: HeadingProps) {
	return (
		<>
			<h1 className='py-4 text-xl font-semibold'>{children}</h1>
		</>
	);
}
