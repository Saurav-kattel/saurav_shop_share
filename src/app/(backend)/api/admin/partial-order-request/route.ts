import { findPurhaseRequestById } from "@/app/services/api/admin/findPurchaseRequestById";
import { handleAcceptedPartialOrderItem } from "@/app/services/api/admin/handleAcceptedPartialOrderItem";
import { handleRejectPartialOrderItem } from "@/app/services/api/admin/handleRejectPartialOrderItem";
import { sendMail } from "@/app/services/api/admin/sendMail";
import { response } from "@/app/services/utils/response";

export async function POST(req: Request) {
    try {
        const { partialRequestItem, confirmation } = await req.json();

        const { PartialOrderItem, PartialOrderItemNotFoundError, RequestIdNotFoundError } = await findPurhaseRequestById({ reqId: partialRequestItem.id });

        if (PartialOrderItemNotFoundError || RequestIdNotFoundError) {
            return response({ status: 404, res: { message: "Product Not Found" } });
        }

        if (confirmation === false || confirmation === 'false') {
            if (PartialOrderItem) {
                const { Success, RejectPartialOrderItemUnknownError } = await handleRejectPartialOrderItem({ partialOrderItemId: PartialOrderItem.id, quantityId: PartialOrderItem.quantityId });

                if (Success && !RejectPartialOrderItemUnknownError) {
                    const { SendMailSuccess, MailRejected, SendMailUnkownError } = await sendMail({ message: "Your request which had been pending has been rejected", email: PartialOrderItem.userEmail! });

                    if (!SendMailSuccess || MailRejected || SendMailUnkownError) {
                        return response({ status: 403, res: { message: "Email has been rejected" } });
                    }

                    return response({ status: 200, res: { message: "User Informed" } });
                }

            }
            return response({ status: 500, res: { messsage: "Internal Server Error" } });
        } else if (confirmation === true || confirmation === "true") {
            if (PartialOrderItem) {

                const {
                    InvalidQuantityIdError,
                    Success,
                    AcceptPartialOrderItemUnknownError
                } = await handleAcceptedPartialOrderItem({
                    partialOrderItemId: PartialOrderItem.id,
                    quantityId: PartialOrderItem.quantityId,
                    requestedQuantity: PartialOrderItem.requestedQuantity
                });

                if (AcceptPartialOrderItemUnknownError) {
                    return response({ status: 500, res: { message: "Internal Server Error At Accepting Partial Order Item" } });
                }

                if (InvalidQuantityIdError) {
                    return response({ status: 404, res: { message: InvalidQuantityIdError } });
                }
                if (Success) {
                    const { MailRejected, SendMailSuccess, SendMailUnkownError } = await sendMail({ message: "Thank you for your patience. The available quantity from request quantity will be delievred to you.", email: PartialOrderItem.userEmail! });

                    if (SendMailUnkownError) {
                        return response({ status: 500, res: { message: "Unknown Error Occured" } });
                    }
                    if (MailRejected) {
                        return response({ status: 403, res: { message: "Email has been rejected" } });
                    }
                    if (SendMailSuccess) {
                        return response({ status: 200, res: { message: "User Informed" } });
                    }
                }
            }
        }
        return response({ status: 200, res: { message: "Success" } });

    } catch (err) {
        return response({ status: 500, res: { message: JSON.stringify(err) } });

    }
}