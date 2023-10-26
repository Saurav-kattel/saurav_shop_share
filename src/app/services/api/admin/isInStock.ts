import prisma from "@/app/services/utils/prisma";


export async function isInStock({ quantityId }: { quantityId: string; }) {
    try {
        const quantity = await prisma.qunatity.findFirst({
            where: {
                id: quantityId
            },
        });
        if (!quantity) {
            return { IsInStock: false };
        }
        return { IsInStock: quantity.total > 0 };
    } catch (err) {
        return { IsInStockUnknownError: err };
    }
}