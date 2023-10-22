import prisma from "../../utils/prisma";

export async function createProductRequest({ cartItem, userId }: {
    cartItem: {
        id: string,
        productId: string;
        size: string;
        color: string;
        requestedQuantity: number;
        price: number;
    }[];
    userId: string;
}) {
    if (cartItem.length > 0) {
        try {
            for (let item of cartItem) {
                console.log("item", item);
                let data = await prisma.productRequest.create({
                    data: {
                        productId: item.productId,
                        userId,
                        requestedQuatity: item.requestedQuantity,
                        size: item.size,
                        color: item.color,
                        price: item.price
                    }
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