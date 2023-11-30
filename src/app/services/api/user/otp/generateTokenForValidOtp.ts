import { SignJWT } from "jose";

export async function generateTokenForValidOtp({
  accepted,
  userId,
  email,
}: {
  accepted: string;
  userId: string;
  email: string;
}) {
  const token = await new SignJWT({ accepted, userId, email })
    .setIssuedAt()
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setSubject(accepted)
    .setSubject(email)
    .sign(new TextEncoder().encode(process.env.SECRET));
  return { token };
}
