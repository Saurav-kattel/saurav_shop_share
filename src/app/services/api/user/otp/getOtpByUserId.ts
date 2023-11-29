import prisma from "../../../utils/prisma";

export async function getOtpByUserId(userId: string, otp?: number) {
  try {
    if (!otp) {
      let dupOtp = await prisma.otp.findFirst({
        where: {
          user_id: userId,
        },
      });
      return { dupOtp, OtpFetchError: undefined };
    }
    let dupOtp = await prisma.otp.findFirst({
      where: {
        user_id: userId,
        otp_val: otp,
      },
    });
    console.log(dupOtp);
    return { dupOtp, OtpFetchError: undefined };
  } catch (err: any) {
    console.log(err);
    return { OtpFetchError: err };
  }
}
