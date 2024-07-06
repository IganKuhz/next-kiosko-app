import { prisma } from '@/src/lib/prisma';

// This is a dynamic route, which means it will be executed on every request.
export const dynamic = 'force-dynamic';

export async function GET() {
	const orders = await prisma.order.findMany({
		take: 5,
		where: {
			readyAt: {
				not: null,
			},
		},
		orderBy: {
			readyAt: 'desc',
		},
		include: {
			orderProducts: {
				include: {
					product: true,
				},
			},
		},
	});
	return Response.json(orders);
}
