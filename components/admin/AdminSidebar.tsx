import Logo from '../ui/Logo';
import AdminIcon from './AdminIcon';

const adminNavigation = [
	{ url: '/admin/orders', text: 'Ordenes', blank: false },
	{ url: '/admin/products', text: 'Productos', blank: false },
	{ url: '/order/cafe', text: 'Ver Kiosco', blank: true },
];

export default function AdminSidebar() {
	return (
		<>
			<aside className='m-4 h-[calc(100dvh-32px)] w-64 rounded-md bg-amber-100 p-4 text-black'>
				<Logo />
				<h1 className='mb-4 text-center font-black uppercase'>Navegación</h1>
				<nav className='flex flex-col gap-4'>
					{adminNavigation.map(link => (
						<AdminIcon
							key={link.url}
							link={link}
						/>
					))}
				</nav>
			</aside>
		</>
	);
}
