import { response } from "@/app/services/utils/response";
import { createUser } from "@/app/services/user/createuser";
import generateHash from "@/app/services/user/generateHash";
import { generateToken } from "@/app/services/user/generateToken";
import { getUser } from "@/app/services/user/getUser";
import { validate } from "@/app/services/user/validate";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { username, email, password } = await req.json();
    const validation = validate({ username, email, password });
    if (validation.length > 0) {
        return response({ status: 400, res: validation });
    }
    const isDuplicateUser = await getUser({ email });
    if (isDuplicateUser) {
        return response({ status: 401, res: { message: "user already exists" } });
    }
    const { hashError, hash } = generateHash(password);
    if (hashError || !hash) {
        return response({ status: 500, res: { message: "Internal server error" } });
    }
    const { user } = await createUser({ username, email, hash });
    if (!user) {
        return response({ status: 500, res: { message: "Internal Server Error" } });
    }
    let { token } = await generateToken({ userId: user?.id, email: user.email });

    const resWithCookies = NextResponse.json({ success: true }, { status: 200 });
    resWithCookies.cookies.set("auth", token);
    return resWithCookies;
}