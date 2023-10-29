import prisma from "../../utils/prisma";

export async function getProductById(id: string, withQuantity = true) {
    let include = {};

    if (withQuantity) {
        include = {
            category: true,
            rating: true,
            quantity: {
                where: {
                    status: "InStock"
                }
            },
        };
    } else {
        include = {
            category: true,
            rating: true,
        };
    }
    try {
        let data = await prisma.product.findUnique({
            where: {
                id
            },
            include: include
        });
        return { data };
    } catch (err: any) {
        return { GetProductByIdError: err.message };
    }
}