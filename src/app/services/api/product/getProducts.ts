import prisma from "../../utils/prisma";

export async function getUProducts() {
    try {
        let product = await prisma.product.findMany({
            include: {
                category: true,
                rating: true,
                quantity: true,
            }
        });
        return { product };
    } catch (err: any) {
        return { GetProductError: err.mesaage };
    }
}