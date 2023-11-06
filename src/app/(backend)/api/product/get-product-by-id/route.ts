import { getProductById } from "@/app/services/api/product/getProductById";
import { response } from "@/app/services/utils/response";

export async function GET(req: Request) {
    const id = req.headers.get("id");

    if (!id) {
        return response({ status: 404, res: { message: "Id Not Found" } });
    }
    const { data, GetProductByIdError } = await getProductById(id);
    if (!data || GetProductByIdError) {
        return response({ status: 500, res: { message: GetProductByIdError } });
    }
    return response({ status: 200, res: { data } });
}