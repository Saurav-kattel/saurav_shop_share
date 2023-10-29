import { sendMail } from "@/app/services/api/admin/sendMail";
import { handlePurchase } from "@/app/services/api/product/handlePurchase";
import { decodeToken } from "@/app/services/api/user/decodeToken";
import { getUser } from "@/app/services/api/user/getUser";
import { response } from "@/app/services/utils/response";

export type TCartItem = {
    id: string;
    productId: string;
    size: string;
    color: string;
    firstname: string;
    requestedQuantity: number;
    price: number;
    userId: string;
    quantityId: string;
    lastname: string;
    province: string;
    zipcode: string;
    userEmail: string;
    phoneNumber: string;
    cartId: string;
};
//TODO: only need to send emails to user about thier requests 
export async function POST(req: Request) {
    const token = req.headers.get("auth");


    const PurchaseRequestErrors: any[] = [];
    const PurchaseRequestSuccess: any[] = [];
    const PartialRequestOrder: any[] = [];
    const PurchaseRequestRejected: any[] = [];

    if (!token) {
        return response({ status: 400, res: { message: "auth token not found" } });
    }
    const { payload, JwtDecodeError } = await decodeToken(token);

    if (JwtDecodeError || !payload) {
        return response({ status: 500, res: { message: JwtDecodeError } });
    }
    const user = await getUser({ id: payload.userId as string });

    if (!user) {
        return response({ status: 400, res: { message: "user not found" } });
    }

    let email = '';

    const { cartItem } = await req.json();
    console.log(cartItem);
    for (let item of cartItem as TCartItem[]) {
        email = item.userEmail;
        let { status, res } = await handlePurchase({ item, userId: payload.userId as string });

        if (status !== 200) {
            PurchaseRequestErrors.push(item);
        } else if (status === 200 && res.PurchaseSuccessfull) {
            PurchaseRequestSuccess.push(item);
        }
        else if (status === 200 && res.RejectedPurchaseRequest) {
            PurchaseRequestRejected.push(item);
        }
        else if (status === 200 && res.PartialProductPurchaseRequest) {
            PartialRequestOrder.push(item);
        }

    }

    console.log("PartialRequestOrder", PartialRequestOrder);
    console.log("PurchaseRequestRejected", PurchaseRequestRejected);
    console.log("PurchaseRequestSuccess", PurchaseRequestSuccess);
    console.log("PurchaseRequestErrors", PurchaseRequestErrors);

    if (PurchaseRequestRejected.length > 0) {

        const { SendMailUnkownError, SendMailSuccess } = await sendMail({
            message: `Purchase  For Following Products Was Rejected becasue of  Errors or Item being out of stock and you have not been charged for these products: 
        cartId: ${PurchaseRequestRejected[0].cartId}
        ${PurchaseRequestErrors.map((item) => `
        <h2>${item.productName}</h2>
        <img src=${item.imageUrl} />
        <div>Price: $${item.price}</div>
        <div>Size: ${item.size}</div>
        <div>Color: ${item.color}</div>
        <div>requestedQuantity: ${item.requestedQuantity}</div>
        `)}`, email: email
        });


        if (!SendMailSuccess || SendMailUnkownError) {
            return response({ status: 500, res: { message: "Error Occured while sending email" } });
        }

        return response({ status: 200, res: { message: "mail sucessfully sent " } });
    }
    if (PurchaseRequestErrors.length > 0) {

        const { SendMailUnkownError, SendMailSuccess } = await sendMail({
            message: `Purchase  For Following Products Was Unsuccessfull becasue of the Error and you have not been charged for these products: 
        cartId: ${PurchaseRequestErrors[0].cartId}
        ${PurchaseRequestErrors.map((item) => `
        <h2>${item.productName}</h2>
        <img src=${item.imageUrl} />
        <div>Price: $${item.price}</div>
        <div>Size: ${item.size}</div>
        <div>Color: ${item.color}</div>
        <div>requestedQuantity: ${item.requestedQuantity}</div>
        `)}`, email: email
        });


        if (!SendMailSuccess || SendMailUnkownError) {
            return response({ status: 500, res: { message: "Error Occured while sending email" } });
        }

        return response({ status: 200, res: { message: "mail sucessfully sent " } });
    }


    if (PurchaseRequestSuccess.length > 0) {

        const { SendMailUnkownError, SendMailSuccess } = await sendMail({
            message: `Your order for follownig items was successfull for cartId: ${PurchaseRequestSuccess[0].cartId}:
              ${PurchaseRequestSuccess.map((item) => {
                return `
            <div>
                <h2>${item.productName}</h2>
                <img src=${item.imageUrl} />
                <div>Price: $${item.price}</div>
                <div>Size: ${item.size}</div>
                <div>Color: ${item.color}</div>
                <div>requestedQuantity: ${item.requestedQuantity}</div>
            </div>
                `;
            })}`, email: email
        });

        if (!SendMailSuccess || SendMailUnkownError) {
            return response({ status: 500, res: { message: "Error Occured while sending email" } });
        }
        return response({ status: 200, res: { message: "mail sucessfully sent " } });
    }


    if (PartialRequestOrder.length > 0) {
        const { SendMailUnkownError, SendMailSuccess } = await sendMail({
            message: `
    <div>
        <h2>We are sorry to inform you that the the quantity requested for the below product(s) excedeed the current availble quantity</h2>
         <div> CartId: ${PartialRequestOrder[0].cartId}</div>
       ${PartialRequestOrder.map((item) => `
        <div>
        <h2>${item.productName}</h2>
        <img src=${item.imageUrl} />
        <div>Price:  ${item.price}</div>
        <div>Size:  ${item.size}</div>
        <div>Color:  ${item.color}</div>
        <div> RequestedQuantity:  ${item.requestedQuantity}</div>
    </div>
       ` )}
        <p> The below link  will take you to the page where you can decide how this order should be handled</p>
        <ul>
        <li>Accept the purchase of available quantity out of requested quantiy. You will only be charged for the the available  quantity and refund for the remaining quantity</li>
        <li>Reject the order for this product and you will be refunded for this product</li>
        </ul>
        <div>`, email: email
        });

        if (!SendMailSuccess || SendMailUnkownError) {
            return response({ status: 500, res: { message: "Error Occured while sending email" } });
        }
        return response({ status: 200, res: { message: "mail sucessfully sent " } });
    }
    return response({ status: 500, res: { message: "Unknown Error Occured" } });
}