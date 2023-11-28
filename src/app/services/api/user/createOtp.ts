import prisma from "../../utils/prisma";
import { deleteOtpById } from "./deleteOtpById";
import { getOtpByUserId } from "./getOtpByUserId";

export async function createOtp({
  userId,
  otp,
}: {
  userId: string;
  otp: number;
}) {
  try {
    let newOtp = await prisma.otp.create({
      data: {
        user_id: userId,
        otp_val: otp,
      },
    });
    return { newOtp, OtpCreationError: undefined };
  } catch (err: any) {
    return { newOtp: undefined, OtpCreationError: err };
  }
}
