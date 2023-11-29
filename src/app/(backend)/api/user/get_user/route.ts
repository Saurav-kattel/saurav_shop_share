import { decodeToken } from "@/app/services/api/user/user/tokens/decodeToken";
import { getUser } from "@/app/services/api/user/user/getUser";
import { response } from "@/app/services/utils/response";

export async function GET(req: Request) {
  const id = req.headers.get("auth");
  if (!id) {
    return response({ status: 404, res: { message: "auth not found" } });
  }
  const { payload, JwtDecodeError } = await decodeToken(id);
  if (!payload || JwtDecodeError) {
    return response({ status: 500, res: { message: "Unknwon Error" } });
  }
  const user = await getUser({
    id: payload.userId as string,
    withPassword: false,
  });
  if (!user) {
    return response({ status: 404, res: { message: "user not found" } });
  }
  return response({ status: 200, res: { user } });
}
