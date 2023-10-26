import { isInStock } from "@/app/services/api/admin/isInStock";
import { createProductRequest } from "@/app/services/api/product/createProductRequest";
import { decodeToken } from "@/app/services/api/user/decodeToken";
import { getUser } from "@/app/services/api/user/getUser";
import { response } from "@/app/services/utils/response";

type TCartItem = {
    id: string;
    productId: string;
    size: string;
    color: string;
    requestedQuantity: number;
    price: number;
    userId: string;
    quantityId: string;
    lastname: string;
    province: string;
    zipcode: string;
    userEmail: string;
    phoneNumber: string;
}[];
export async function POST(req: Request) {

    const { cartItem } = await req.json();
    for (let items of cartItem) {
        const { IsInStock, IsInStockError } = await isInStock({ quantityId: items.quantityId });
        if (!IsInStock) {
            // TODO: need to implement rejected and send mail shits
        } else if (IsInStockError) {
            return response({ status: 500, res: { IsInStockError } });
        } else {
            //TODO:  check if the requested quantity meets in items in stock
            //    if meets, remove the request quanity from db changed status to success and send mail to user
            //    else  ask for the partial fulfilment freeze the product untill restocking 
            //TODO: inform user about the situation

        }
    }
    return response({ status: 200, res: { success: true } });
}