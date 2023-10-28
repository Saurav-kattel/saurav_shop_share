import { handleInStock } from "@/app/services/api/admin/handleInStock";
import { handleOutOfStock } from "@/app/services/api/admin/handleOutOfStock";
import { isInStock } from "@/app/services/api/admin/isInStock";
import { sendMail } from "@/app/services/api/admin/sendMail";
import { getQuantity } from "@/app/services/api/product/getQuantity";




export async function handlePurchase({ item, userId }: { item: any, userId: string; }) {
    //need edit this to not send emails
    try {


        const { Quantity, InvalidQuantityIdError, GetQuanitiyUnknownError } = await getQuantity(item.quantityId);

        if (InvalidQuantityIdError || GetQuanitiyUnknownError || !Quantity) {
            return { status: 500, res: { message: "invalid quantity id at handle purchase" } };
        }

        if (!userId) {
            return { status: 404, res: { message: "Unable to authenticate" } };
        }

        const { IsInStock, IsInStockUnknownError } = await isInStock({ quantityId: item.quantityId });

        if (!IsInStock) {
            const result = await handleOutOfStock(item, userId);

            if (result.status === 200 && result.res.message.RejectedPurchaseRequest) {
                const {
                    SendMailSuccess,
                    SendMailUnkownError
                } = await sendMail({ message: "Your purchase request is rejected due to item being outofstock", email: item.userEmail });
                if (SendMailUnkownError || !SendMailSuccess) {
                    return { status: 500, res: { message: SendMailUnkownError } };
                }

                return result;

            }

            return result;

        } else if (IsInStockUnknownError) {
            return { status: 500, res: { message: IsInStockUnknownError } };
        } else {


            const result = await handleInStock({ item, userId, quantityTotal: Quantity.total });
            if (result?.status === 200 && result.res.PartialProductPurchaseRequest) {
                const { SendMailSuccess, SendMailUnkownError } = await sendMail({ message: "The requested quantity excceded the available quantity in the stock, your request is still pending click the below link to go to the page where you can either the accept the available quanity and be charged only for those or reject to get full refund", email: item.userEmail });


                if (!SendMailSuccess && SendMailUnkownError) {
                    return { status: 500, res: { message: "Unknoen Error occured at handleInStock sendMail" } };
                }
            }
            if (result?.status === 200 && result.res.PurchaseSuccessfull) {

                const { SendMailSuccess, SendMailUnkownError } = await sendMail({ message: "The requested Prdouct has successfully purchased", email: item.userEmail });



                if (!SendMailSuccess && SendMailUnkownError) {
                    return { status: 500, res: { message: "Unkown Error occured at handleInStock sendMail" } };
                }
            }
            return { status: result.status, res: { message: result?.res.message } };
        }

    } catch (error) {
        console.error("Error in PATCH:", error);
        return { status: 500, res: { message: "Internal Server Error" } };
    }
}
