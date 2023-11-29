import prisma from "../../../utils/prisma";

export async function deleteOtpById(otpId: string) {
  try {
    await prisma.otp.delete({
      where: {
        id: otpId,
      },
    });
    return { DeleteOtpError: undefined };
  } catch (err: any) {
    return { DeleteOtpError: err };
  }
}
