import { getProducts } from "@/app/services/api/product/getProducts";
import { response } from "@/app/services/utils/response";

export async function GET() {
    const { product, GetProductError } = await getProducts();
    if (GetProductError) {
        return response({ status: 500, res: { message: GetProductError } });
    }
    return response({ status: 200, res: { product } });
}