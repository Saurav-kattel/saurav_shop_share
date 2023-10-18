import prisma from "../../utils/prisma";

export async function getProductById(id: string) {
    try {
        let data = await prisma.product.findUnique({
            where: {
                id
            }, include: {
                category: true,
                rating: true,
                size: true,
                quantity: true
            }
        });
        return { data };
    } catch (err: any) {
        return { GetProductByIdError: err.message };
    }
}