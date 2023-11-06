import prisma from "../../utils/prisma";

export async function getRequestedProduct() {
    try {
        const data = await prisma.productRequest.findMany({
            where: {
                status: "Pending"
            },
            orderBy: {
                requestedAt: "asc"
            }, include: {
                product: true
            }
        });
        return { data };

    } catch (err: any) {
        return { GetRequestedProductError: err };
    }
}