import prisma from "../../utils/prisma";

export async function handleAcceptedPartialOrderItem({ partialOrderItemId, quantityId, requestedQuantity }: {
    partialOrderItemId: string;
    quantityId: string;
    requestedQuantity: number;
}) {
    try {
        await prisma.productRequest.update({
            where: {
                id: partialOrderItemId
            },
            data: {
                status: "Success"
            }
        });

        const quantity = await prisma.qunatity.findFirst({
            where: {
                id: quantityId
            }
        });

        if (!quantity) {
            return { InvalidQuantityIdError: "Invalid Quantity Id" };
        }

        const quantityStatus = quantity?.status;

        if (quantityStatus === "OutOfStock" || quantity.total === requestedQuantity) {
            await prisma.qunatity.delete({
                where: {
                    id: quantityId
                }
            });
        } else {
            await prisma.qunatity.update({
                where: {
                    id: quantityId
                },
                data: {
                    status: quantityStatus,
                    total: quantity?.total! - requestedQuantity
                }
            });
        }
        return { Success: true };
    } catch (error) {
        return { AcceptPartialOrderItemUnknownError: error };
    }
}