import { createProductRequest } from "@/app/services/api/product/createProductRequest";
import { validatePurchase } from "@/app/services/api/product/validatePurchase";
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
    const id = req.headers.get("auth");

    if (!id) {
        return response({ status: 400, res: { message: "auth token not found" } });
    }
    const { payload, JwtDecodeError } = await decodeToken(id);

    if (JwtDecodeError || !payload) {
        return response({ status: 500, res: { message: JwtDecodeError } });
    }
    const user = await getUser({ id: payload.userId as string });
    if (!user) {
        return response({ status: 400, res: { message: "user not found" } });
    }
    const { cartItem } = await req.json();
    const { success, ProductRequestCreatonError, EmptyCartError } = await createProductRequest({ cartItem: cartItem as TCartItem, userId: user.id });
    await validatePurchase();
    if (!success || ProductRequestCreatonError || EmptyCartError) {
        return response({ status: 500, res: { message: ProductRequestCreatonError || EmptyCartError } });
    }
    return response({ status: 200, res: { success } });
}