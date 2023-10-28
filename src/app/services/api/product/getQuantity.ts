import prisma from "../../utils/prisma";

export async function getQuantity(quantityId: string) {
    try {
        const quantity = await prisma.qunatity.findFirst({
            where: {
                id: quantityId
            }
        });

        if (!quantity) {
            return { InvalidQuantityIdError: "Invalid QuantityI" };
        }
        return { Quantity: quantity };
    } catch (err: any) {
        return { GetQuanitiyUnknownError: err.message };
    }

}