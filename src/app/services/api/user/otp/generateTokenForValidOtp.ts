import { SignJWT } from "jose";

export async function generateTokenForValidOtp({
  accepted,
  userId,
}: {
  accepted: string;
  userId: string;
}) {
  const token = await new SignJWT({ accepted, userId })
    .setIssuedAt()
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setSubject(accepted)
    .sign(new TextEncoder().encode(process.env.SECRET));
  return { token };
}
