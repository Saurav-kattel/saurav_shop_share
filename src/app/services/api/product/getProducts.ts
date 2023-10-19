import prisma from "../../utils/prisma";

export async function getUProducts() {
    try {
        let product = await prisma.product.findMany({
            include: {
                category: true,
                rating: true,
                size: true,
                quantity: true,
                colors: true
            }
        });
        return { product };
    } catch (err: any) {
        return { GetProductError: err.mesaage };
    }
}