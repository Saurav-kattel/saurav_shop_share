import { checkPartialOrderItem } from "@/app/services/api/admin/checkPartialOrderItem";
import { getRequestedProduct } from "@/app/services/api/admin/getRequestedProduct";
import { handlePurchaseRequest } from "@/app/services/api/admin/handleSuccessfulPurchaseRequest";
import { isInStock } from "@/app/services/api/admin/isInStock";
import { rejectPurchaseRequest } from "@/app/services/api/admin/rejectPurchaseRequest";
import { sendMail } from "@/app/services/api/admin/sendMail";
import { response } from "@/app/services/utils/response";
export async function PATCH(req: Request) {
    const { data, GetRequestedProductError } = await getRequestedProduct();
    if (!data || GetRequestedProductError) {
        return response({ status: 500, res: { message: "Internal Server Error" } });
    }
    for (let items of data) {

        const { IsInStock, IsInStockUnknownError } = await isInStock({ quantityId: items.quantityId });
        if (!IsInStock) {

            const { RejectedRequestSuccess, PurchaseProductIdNotFound, RejectPurchaseRequestUnknownError } = await rejectPurchaseRequest({ purchaseProductId: items.id });
            // Rejecting Purchase Request if item is out of stock

            if (!RejectedRequestSuccess || PurchaseProductIdNotFound || RejectPurchaseRequestUnknownError) {
                response({ status: 500, res: { message: "Internal Server Error" } });
            }
            const { MailRejected, SendMailSuccess, SendMailUnkownError } = await sendMail({ message: "We are very sorry to  inform you that the order you made had to be rejected because of the product being out of stock.\n We will notify you when the product is re-stocked", email: items.userEmail ?? '' });

            if (SendMailUnkownError) {
                response({ status: 500, res: { message: "Unable To Send Mail" } });
            }
            if (MailRejected) {
                response({ status: 500, res: { message: MailRejected } });
            }
            if (SendMailSuccess) {
                response({ status: 200, res: { message: "Informed User" } });
            }

        } else if (IsInStockUnknownError) {
            response({ status: 500, res: { message: IsInStockUnknownError } });
        }

        const { IsPartialOrderRequest, InvalidQunatityIdError } = await checkPartialOrderItem({ quantityId: items.id, requestedQuantity: items.requestedQuantity });
        if (InvalidQunatityIdError) {
            response({ status: 400, res: { message: "Invalid Quantity Id" } });
        }

        if (IsPartialOrderRequest) {
            console.log(IsPartialOrderRequest);
            // TODO: handle if requested items is greater then the items in stock
        } else {
            const { PurchaseSuccessfull, PurchaseRequestUnknownError } = await handlePurchaseRequest({ item: items });
            if (!PurchaseSuccessfull || PurchaseRequestUnknownError) {
                response({ status: 500, res: { message: "Internal Server Error" } });
            }
        }

    }
    return response({ status: 200, res: { success: true } });
}