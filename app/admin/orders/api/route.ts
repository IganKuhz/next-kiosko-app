import { prisma } from '@/src/lib/prisma';

// This is a dynamic route, which means it will be executed on every request.
export const dynamic = 'force-dynamic';

export async function GET() {
	const orders = await prisma.order.findMany({
		where: {
			status: false,
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
