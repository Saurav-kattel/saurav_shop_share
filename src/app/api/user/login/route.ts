import { getUser } from "@/app/services/api/user/getUser";
import { generateToken } from "@/app/services/api/user/generateToken";
import { response } from "@/app/services/utils/response";
import verifyPassword from "@/app/services/api/user/verifyPassword";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    if (!email) {
        return response({ status: 400, res: { message: "Invalid Email" } });
    }
    if (password < 6) {
        return response({ status: 400, res: { message: "Wrong Password" } });
    }
    const user = await getUser({ email });

    if (!user) {
        return response({ status: 400, res: { message: "Invalid Email" } });
    }

    const { isCorrectPassword, verificationError } = await verifyPassword({ hash: user.password, password });


    if (!isCorrectPassword || verificationError) {
        return response({ status: 401, res: { message: "Wrong Password" } });
    }
    const { token } = await generateToken({ userId: user.id, email: user.email });
    const resWithCookies = NextResponse.json({ success: true }, { status: 200 });
    resWithCookies.cookies.set("auth", token);
    return resWithCookies;
}