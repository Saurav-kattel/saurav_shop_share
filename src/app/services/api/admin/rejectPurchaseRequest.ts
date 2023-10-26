import prisma from "../../utils/prisma";

export async function rejectPurchaseRequest({ purchaseProductId }: { purchaseProductId: string; }) {
    try {
        let product = await prisma.productRequest.update({
            where: {
                id: purchaseProductId
            },
            data: {
                status: "Rejected"
            }
        });
        if (!product) {
            return { PurchaseProductIdNotFound: "Product with this quantity is not found" };
        }
        return { RejectedRequestSuccess: true };
    } catch (err: any) {
        return { RejectPurchaseRequestUnknownError: err };
    }
}