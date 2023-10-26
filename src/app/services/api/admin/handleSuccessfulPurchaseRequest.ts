import prisma from "../../utils/prisma";

export async function handlePurchaseRequest({ item }: { item: any; }) {
    try {
        const quantity = await prisma.qunatity.findFirst({
            where: {
                id: item.quantityId
            }
        });
        if (!quantity) {
            return { NotFoundError: "Quantity Not Found" };
        }
        if (quantity?.total === 1) {
            await prisma.qunatity.delete({
                where: {
                    id: item.quantityId
                }
            });
            await prisma.productRequest.update({
                where: {
                    id: item.id
                },
                data: {
                    status: "Success"
                }
            });
        }

        if (quantity?.total === item.requestedQuantity) {
            await prisma.qunatity.delete({
                where: {
                    id: item.quantityId
                }
            });
            await prisma.productRequest.update({
                where: {
                    id: item.id
                },
                data: {
                    status: "Success"
                }
            });
        }
        if (item.requestedQuantity <= quantity?.total) {
            await prisma.qunatity.update({
                where: {
                    id: item.quantityId
                },
                data: {
                    total: quantity.total - item.requestedQuantity
                }
            });

            await prisma.productRequest.update({
                where: {
                    id: item.id
                },
                data: {
                    status: "Success"
                }
            });
        }

        return { PurchaseSuccessfull: true };
    } catch (err) {
        return { PurchaseRequestUnknownError: err };
    }
}
