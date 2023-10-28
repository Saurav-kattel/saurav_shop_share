import prisma from "../../utils/prisma";

export async function createProductRequest({ item, userId }: {
    item: {
        id: string,
        productId: string;
        cartId: string;
        size: string;
        color: string;
        requestedQuantity: number;
        price: number;
        quantityId: string;
        userId: string;
        lastname: string;
        firstname: string;
        province: string;
        zipcode: string;
        userEmail: string;
        phoneNumber: string;
    };
    userId: string;
}) {

    try {
        item["userId"] = userId;
        const newPurchaseRequest = await prisma.productRequest.create({
            data: item
        });
        if (!newPurchaseRequest) {
            return { ProductPurchaseRequestError: "Error While Creating A Purchase Request" };
        }
        return { CreatedPurchaseRequest: true };
    } catch (err: any) {
        return { ProductRequestUnknownError: err.message };
    }

}