
import { checkPartialOrderItem } from "@/app/services/api/admin/checkPartialOrderItem";
import { getRequestedProduct } from "@/app/services/api/admin/getRequestedProduct";
import { handleFreezeQuantity } from "@/app/services/api/admin/handleFreezeQuantity";
import { handlePurchaseRequest } from "@/app/services/api/admin/handleSuccessfulPurchaseRequest";
import { isInStock } from "@/app/services/api/admin/isInStock";
import { rejectPurchaseRequest } from "@/app/services/api/admin/rejectPurchaseRequest";
import { sendMail } from "@/app/services/api/admin/sendMail";
import prisma from "@/app/services/utils/prisma";
import { response } from "@/app/services/utils/response";

async function handleOutOfStock(items: any) {
    const { RejectedRequestSuccess, PurchaseProductIdNotFound, RejectPurchaseRequestUnknownError } = await rejectPurchaseRequest({ purchaseProductId: items.id });

    if (!RejectedRequestSuccess || PurchaseProductIdNotFound || RejectPurchaseRequestUnknownError) {
        return { status: 500, res: { message: "Internal Server Error" } };
    }

    const { MailRejected, SendMailSuccess, SendMailUnkownError } = await sendMail({
        message: "We are very sorry to inform you that the order you made had to be rejected because of the product being out of stock.\n We will notify you when the product is re-stocked",
        email: items.userEmail ?? ''
    });

    if (SendMailUnkownError) {
        return { status: 500, res: { message: "Unable To Send Mail" } };
    }
    if (MailRejected) {
        return { status: 500, res: { message: MailRejected } };
    }
    if (SendMailSuccess) {
        return { status: 200, res: { message: "Informed User" } };
    }
}

async function handleInStock(items: any) {
    const { IsPartialOrderRequest, InvalidQunatityIdError } = await checkPartialOrderItem({ quantityId: items.quantityId, requestedQuantity: items.requestedQuantity });

    if (InvalidQunatityIdError) {
        return { status: 400, res: { message: "Invalid Quantity Id" } };
    }

    console.log(items.userEmail, IsPartialOrderRequest);
    if (IsPartialOrderRequest) {
        const quantity = await prisma.qunatity.findFirst({
            where: {
                id: items.quantityId
            },
            include: {
                Product: true
            }
        });

        const { MailRejected, SendMailSuccess, SendMailUnkownError } = await sendMail({
            message: `
              <div>
              The Purchase Request Following Product Was Made.\n
                  ProductId: ${items.productId}\n  
                  ProductName: ${quantity?.Product?.name} \n                 
                  RequestedQuantity:${items.requestedQuantity}\n
                  AvailableQuantity: ${quantity?.total.toString()}\n
                  Color: ${items.color}\n
                  Size: ${items.size}\n
                  Date: ${items.requestedAt.toLocaleDateString()}\n
                  \n
                  But Due To Some Reason We are Unable To Provide You With the  Quantity You Requested,
                  Click ACCEPT button To Purchase The Available Product And You Will Only Be Charged For Available Items click REJECT Button TO Cancel Purchase Request And You Will Be Refunded.\n
  
                  <button> Accept </button>
                  <button> Reject </button>
  
                  THANK YOU FOR YOUR PATIENCE!
          </div>
              `, email: items.userEmail ?? ''
        });

        if (MailRejected || SendMailUnkownError || !SendMailSuccess) {
            return { status: 403, res: { message: "Mail has been Rejected" } };
        }

        const { FreezingProductUnknownError, Freezed } = await handleFreezeQuantity({ quantityId: items.quantityId });

        if (!Freezed || FreezingProductUnknownError) {
            return { status: 500, res: { message: "Unknown Error Occured" } };
        }
    } else {
        const { PurchaseSuccessfull, PurchaseRequestUnknownError } = await handlePurchaseRequest({ item: items });
        if (!PurchaseSuccessfull || PurchaseRequestUnknownError) {
            return { status: 500, res: { message: "Internal Server Error" } };
        }
    }

    return null;
}

export async function PATCH(req: Request) {
    try {
        const { data, GetRequestedProductError } = await getRequestedProduct();

        if (!data || GetRequestedProductError) {
            return response({ status: 500, res: { message: "Internal Server Error" } });
        }

        for (let items of data) {
            const { IsInStock, IsInStockUnknownError } = await isInStock({ quantityId: items.quantityId });

            if (!IsInStock) {
                const result = await handleOutOfStock(items);
                if (result) return response(result);
            } else if (IsInStockUnknownError) {
                return response({ status: 500, res: { message: IsInStockUnknownError } });
            } else {
                const result = await handleInStock(items);
                if (result) return response(result);
            }
        }

        return response({ status: 200, res: { success: true } });
    } catch (error) {
        console.error("Error in PATCH:", error);
        return response({ status: 500, res: { message: "Internal Server Error" } });
    }
}
