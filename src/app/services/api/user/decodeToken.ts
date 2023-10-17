import { jwtVerify } from "jose";

export async function decodeToken(token: string) {
    try {
        let payload = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET));
        return { payload: payload.payload };
    } catch (err: any) {
        return { JwtDecodeError: err.message };
    }

}