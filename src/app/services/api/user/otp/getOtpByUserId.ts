import prisma from "../../../utils/prisma";

export async function getOtpByUserId(userId: string, otp?: number) {
  try {
    if (!otp) {
      let dupOtp = await prisma.otp.findFirst({
        where: {
          user_id: userId,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
      return { dupOtp, OtpFetchError: undefined };
    }

    let dupOtp = await prisma.otp.findFirst({
      where: {
        user_id: userId,
        otp_val: otp,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    console.log(dupOtp);
    return { dupOtp, OtpFetchError: undefined };
  } catch (err: any) {
    console.log(err);
    return { OtpFetchError: err };
  }
}
