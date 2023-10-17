import { getUser } from "@/app/services/api/user/getUser";
import { generateToken } from "@/app/services/api/user/generateToken";
import { response } from "@/app/services/utils/response";
import verifyPassword from "@/app/services/api/user/verifyPassword";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    if (!email) {
        return response({ status: 400, res: { message: "Email not found" } });
    }
    if (password < 6) {
        return response({ status: 400, res: { message: "Weak Password" } });
    }
    const user = await getUser({ email });

    if (!user) {
        return response({ status: 400, res: { message: "User not Found" } });
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