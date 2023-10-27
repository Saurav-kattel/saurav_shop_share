import prisma from "../../utils/prisma";

export async function getProducts() {
    try {
        let product = await prisma.product.findMany({
            include: {
                category: true,
                rating: true,
                quantity: {
                    where: {
                        status: "InStock"
                    }
                },
            }
        });
        return { product };
    } catch (err: any) {
        return { GetProductError: err.mesaage };
    }
}