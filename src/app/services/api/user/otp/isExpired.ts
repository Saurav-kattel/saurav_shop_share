import { deleteOtpById } from "./deleteOtpById";

export async function isExpired(dupOtp: {
  id: string;
  user_id: string;
  otp_val: number;
  created_at: Date;
  expires_at: Date;
}) {
  let date = new Date();
  let currentTimeInMillisecond = date.getTime();
  let expiryDateInMIllisecond = dupOtp.expires_at.getTime();
  if (currentTimeInMillisecond >= expiryDateInMIllisecond) {
    let { DeleteOtpError } = await deleteOtpById(dupOtp.id);
    if (DeleteOtpError) {
      return { DeletionError: DeleteOtpError };
    }
    return { isOtpExpired: true };
  }
  return { isOtpExpired: false };
}
