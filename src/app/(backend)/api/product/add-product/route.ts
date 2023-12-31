import { createProduct } from "@/app/services/api/product/createProduct";
import { decodeToken } from "@/app/services/api/user/user/tokens/decodeToken";
import { isAdmin } from "@/app/services/api/user/user/isAdmin";
import { response } from "@/app/services/utils/response";

export async function POST(req: Request) {
  const token = req.headers.get("auth");
  if (!token) {
    return response({ status: 404, res: { message: "authtoken not found" } });
  }
  const { JwtDecodeError, payload } = await decodeToken(token);

  if (!payload || JwtDecodeError) {
    return response({ status: 400, res: { message: JwtDecodeError } });
  }
  const isAuthorized = await isAdmin({ email: payload.email as string });

  if (!isAuthorized) {
    return response({ status: 401, res: { message: "unauthorized access" } });
  }
  let {
    name,
    description,
    price,
    rating,
    quantites,
    imageUrl,
    category,
    tags,
  } = await req.json();

  const { data, ProductCreationError } = await createProduct({
    name,
    description,
    rating,
    price,
    imageUrl,
    quantites,
    category,
    tags,
  });
  if (!data || ProductCreationError) {
    return response({ status: 500, res: { message: ProductCreationError } });
  }

  return response({ status: 200, res: { success: true } });
}
