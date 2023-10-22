import prisma from "../../utils/prisma";

export async function getRequestedProduct() {
    try {
        const data = await prisma.productRequest.findMany();
        return { data };

    } catch (err: any) {
        return { GetRequestedProductError: err };
    }
}