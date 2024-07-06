import { PrismaClient } from '@prisma/client';
import { categories } from './data/categories';
import { products } from './data/products';

// Execute npx prisma db seed

// Seed the database
const prisma = new PrismaClient();

// Seed the database
async function main() {
	try {
		await prisma.category.createMany({
			data: categories,
		});
		await prisma.product.createMany({
			data: products,
		});
	} catch (error) {
		console.error(error);
	}
}

// Run the seed function
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async error => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
