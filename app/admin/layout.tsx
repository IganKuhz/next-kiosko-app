import AdminSidebar from '@/components/admin/AdminSidebar';
import ToastNotify from '@/components/ui/ToastNotify';

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className='flex items-center'>
				<AdminSidebar />

				<main className='h-[calc(100vh-32px)] flex-1 p-4 lg:overflow-y-scroll'>
					{children}
				</main>
			</div>

			<ToastNotify />
		</>
	);
}
