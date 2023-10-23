import prisma from "../../utils/prisma";

export async function createProductRequest({ cartItem, userId }: {
    cartItem: {
        id: string,
        productId: string;
        size: string;
        color: string;
        requestedQuantity: number;
        price: number;
        quantityId: string;
        userId: string;
    }[];
    userId: string;
}) {
    if (cartItem.length > 0) {
        try {
            for (let item of cartItem) {
                item["userId"] = userId;
                await prisma.productRequest.create({
                    data: { ...item }
                });
            }
            return { success: true };
        } catch (err: any) {
            return { ProductRequestCreatonError: err };
        }
    } else {
        return { EmptyCartError: "cart is empty" };
    }
}