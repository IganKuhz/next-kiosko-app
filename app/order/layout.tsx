import OrderSidebar from '@/components/order/OrderSidebar';
import OrderSummary from '@/components/order/OrderSummary';
import ToastNotify from '@/components/ui/ToastNotify';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className='flex items-center'>
				<OrderSidebar />

				<main className='relative h-[calc(100vh-32px)] flex-1 p-4 lg:overflow-y-scroll'>
					{children}
				</main>
				<OrderSummary />
			</div>

			<ToastNotify />
		</>
	);
}
