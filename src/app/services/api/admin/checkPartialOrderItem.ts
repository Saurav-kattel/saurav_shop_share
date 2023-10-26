import prisma from "../../utils/prisma";

export async function checkPartialOrderItem({ quantityId, requestedQuantity }: { quantityId: string; requestedQuantity: number; }) {
    const qunatity = await prisma.qunatity.findFirst({
        where: {
            id: quantityId
        }
    });
    if (!qunatity) {
        return { InvalidQunatityIdError: "Quantity Not Found" };
    }

    if (requestedQuantity > qunatity?.total) {
        console.log(qunatity); //if req qun is grte ten total 
        return { IsPartialOrderRequest: true };
    } else {
        return { IsPartialOrderRequest: false };
    }
}