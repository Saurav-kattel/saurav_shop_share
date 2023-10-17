import { SignJWT } from "jose";

export async function generateToken({ userId, email }: {
    userId: string,
    email: string;
}) {

    const token = await new SignJWT({ email, userId })
        .setIssuedAt()
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(email)
        .setSubject(userId)
        .sign(new TextEncoder().encode(process.env.SECRET));
    return { token };
}