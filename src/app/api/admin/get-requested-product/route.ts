import { getRequestedProduct } from "@/app/services/api/admin/getRequestedProduct";
import { decodeToken } from "@/app/services/api/user/decodeToken";
import { getUser } from "@/app/services/api/user/getUser";
import { response } from "@/app/services/utils/response";

export async function GET(req: Request) {
    const id = req.headers.get("auth");;
    if (!id) {
        return response({ status: 404, res: { message: "auth not found" } });
    }
    const { payload, JwtDecodeError } = await decodeToken(id);
    if (!payload || JwtDecodeError) {
        return response({ status: 500, res: { message: JwtDecodeError } });
    }
    const user = await getUser({ id: payload.userId as string });
    if (!user) {
        return response({ status: 404, res: { message: "user not found" } });
    }
    if (!(user.role.toLowerCase() === 'admin')) {
        return response({ status: 401, res: { message: "unauthorized access" } });
    }
    const { GetRequestedProductError, data } = await getRequestedProduct();
    if (!data || GetRequestedProductError) {
        return response({ status: 500, res: { message: GetRequestedProductError } });
    }
    return response({ status: 200, res: { data } });
}