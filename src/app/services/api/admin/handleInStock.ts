import { TCartItem } from "@/app/api/product/request-purchase/route";
import { createProductRequest } from "../product/createProductRequest";
import { getQuantity } from "../product/getQuantity";
import { accpetPurchaseRequest } from "./accpetPurchaseRequest";
import { checkPartialOrderItem } from "./checkPartialOrderItem";
import { handleFreezeQuantity } from "./handleFreezeQuantity";

export async function handleInStock({ item, userId, quantityTotal }: { item: TCartItem, userId: string, quantityTotal: number; }) {

    const { Quantity, InvalidQuantityIdError, GetQuanitiyUnknownError } = await getQuantity(item.quantityId);

    if (InvalidQuantityIdError) {
        return { status: 400, res: { message: InvalidQuantityIdError } };
    }

    if (GetQuanitiyUnknownError || !Quantity) {
        return { status: 500, res: { message: "Unknown Error Occured At getQuantity " } };
    }

    const { IsPartialOrderRequest, InvalidQunatityIdError } = await checkPartialOrderItem({ quantity: Quantity, requestedQuantity: item.requestedQuantity });

    if (InvalidQunatityIdError) {
        return { status: 400, res: { message: "Invalid Quantity Id" } };
    }

    if (IsPartialOrderRequest) {

        const { FreezingProductUnknownError, Freezed } = await handleFreezeQuantity({ quantityId: item.quantityId });

        if (!Freezed || FreezingProductUnknownError) {
            return { status: 500, res: { message: "Unknown Error Occured At handleFreezeQuantity" } };
        }
        const {
            CreatedPurchaseRequest,
            ProductPurchaseRequestError,
            ProductRequestUnknownError
        } = await createProductRequest({ item, userId: userId });

        if (ProductPurchaseRequestError || ProductRequestUnknownError) {
            return { status: 500, res: { message: "Unknown Error Occured While Creating Partial Request Error" } };
        }

        if (CreatedPurchaseRequest) {
            return { status: 200, res: { PartialProductPurchaseRequest: true } };
        }

    }
    const { PurchaseSuccessfull, PurchaseRequestUnknownError } = await accpetPurchaseRequest({ item, userId, quantityTotal });

    if (!PurchaseSuccessfull || PurchaseRequestUnknownError) {
        console.log(PurchaseRequestUnknownError);
        return { status: 500, res: { message: PurchaseRequestUnknownError } };
    }
    return { status: 200, res: { PurchaseSuccessfull: true } };

}
