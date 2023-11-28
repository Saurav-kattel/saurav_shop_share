import prisma from "../../utils/prisma";

export async function getOtpByUserId(userId: string) {
  try {
    let dupOtp = await prisma.otp.findFirst({
      where: {
        user_id: userId,
      },
    });
    return { dupOtp, OtpFetchError: undefined };
  } catch (err: any) {
    return { OtpFetchError: err };
  }
}
