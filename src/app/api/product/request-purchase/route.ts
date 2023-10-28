import { sendMail } from "@/app/services/api/admin/sendMail";
import { createProductRequest } from "@/app/services/api/product/createProductRequest";
import { handlePurchase } from "@/app/services/api/product/handlePurchase";
import { validatePurchase } from "@/app/services/api/product/validatePurchase";
import { decodeToken } from "@/app/services/api/user/decodeToken";
import { getUser } from "@/app/services/api/user/getUser";
import { response } from "@/app/services/utils/response";

type TCartItem = {
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
}[];
export async function POST(req: Request) {
    const token = req.headers.get("auth");
    const PurchaseRequestErrors: any[] = [];
    const PurchaseRequestSuccess: any[] = [];
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
    for (let item of cartItem) {
        email = item.userEmail;
        let res = await handlePurchase({ item, userId: payload.userId as string });
        if (res.status !== 200) {
            PurchaseRequestErrors.push({ itemName: item, res: res });
        } else {
            PurchaseRequestSuccess.push({ itemName: item, res: res });
        }
    }

    if (PurchaseRequestErrors.length > 0) {

        const { SendMailUnkownError, SendMailSuccess } = await sendMail({ message: "Errors Regarding Purchase " + JSON.stringify(PurchaseRequestErrors), email: email });


        if (!SendMailSuccess || SendMailUnkownError) {
            return response({ status: 500, res: { message: "Error Occured while sending email" } });
        }

        return response({ status: 200, res: { message: "mail sucessfully sent " } });
    }
    if (PurchaseRequestSuccess.length > 0) {
        const { SendMailUnkownError, SendMailSuccess } = await sendMail({ message: "sucessfully purchased items" + JSON.stringify(PurchaseRequestErrors), email: email });

        if (!SendMailSuccess || SendMailUnkownError) {
            return response({ status: 500, res: { message: "Error Occured while sending email" } });
        }
        return response({ status: 200, res: { message: "mail sucessfully sent " } });
    }

    return response({ status: 500, res: { message: "Unknown Error Occured" } });
}