import { rejectPurchaseRequest } from "./rejectPurchaseRequest";

export async function handleOutOfStock(item: any, userId: string) {
    const { RejectedPurchaseRequest, RejcectingPurchaseRequestFailed, RejectPurchaseRequestUnknownError } = await rejectPurchaseRequest({ purchaseProductData: item, userId });

    if (RejcectingPurchaseRequestFailed) return { status: 500, res: { message: "Unable to create purchase request" } };

    if (RejectPurchaseRequestUnknownError) return { status: 500, res: { message: RejectPurchaseRequestUnknownError.message } };

    if (RejectedPurchaseRequest) return { status: 200, res: { message: { RejectedPurchaseRequest: true, cause: "Out OF Stock" } } };

    return { status: 500, res: { message: "Internal Server Error" } };
}

