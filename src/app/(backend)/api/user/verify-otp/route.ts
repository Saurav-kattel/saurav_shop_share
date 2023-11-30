import { decodeToken } from "@/app/services/api/user/user/tokens/decodeToken";
import { deleteOtpById } from "@/app/services/api/user/otp/deleteOtpById";
import { isExpired } from "@/app/services/api/user/otp/isExpired";
import { response } from "@/app/services/utils/response";
import { NextResponse } from "next/server";
import { getOtpByUserId } from "@/app/services/api/user/otp/getOtpByUserId";
import { generateTokenForValidOtp } from "@/app/services/api/user/otp/generateTokenForValidOtp";

export async function POST(req: Request) {
  try {
    let { otp } = await req.json();
    let token = await req.headers.get("otp_verifcation_cookie");

    if (!token) {
      return response({
        status: 404,
        res: { message: "verification token not found" },
      });
    }
    if (otp.length !== 5) {
      return response({ status: 400, res: { message: "invalid otp" } });
    }

    let numbersRegex = /^\d+$/;
    if (!otp.match(numbersRegex)) {
      return response({ status: 400, res: { message: "invalid otp" } });
    }

    let { payload, JwtDecodeError } = await decodeToken(token);
    if (!payload || JwtDecodeError) {
      return response({
        status: 500,
        res: { message: "Unknown error occured jwt error" },
      });
    }

    let { dupOtp, OtpFetchError } = await getOtpByUserId(
      payload.userId as string,
      parseInt(otp)
    );

    if (OtpFetchError) {
      return response({
        status: 500,
        res: { message: "Unknown error occured otp fetch error" },
      });
    }

    if (!dupOtp) {
      return response({ status: 401, res: { message: "invalid otp" } });
    }
    let { isOtpExpired, DeletionError } = await isExpired(dupOtp);

    if (isOtpExpired) {
      return response({ status: 401, res: { message: "expired otp" } });
    }

    if (DeletionError) {
      return response({
        status: 500,
        res: { message: "unnown error occured" },
      });
    }

    const newVerifiedToken = await generateTokenForValidOtp({
      accepted: "this_otp_was_accepted",
      userId: dupOtp.user.id,
      email: dupOtp.user.email,
    });

    let responseWithCookies = NextResponse.json(
      { res: { message: "verifed", success: true } },
      { status: 200 }
    );
    responseWithCookies.cookies.delete("otp_verifcation_cookie");
    responseWithCookies.cookies.set({
      name: "otp_verifcation_accepted",
      value: newVerifiedToken.token,
      maxAge: 1000 * 60 * 10,
      path: "/",
      httpOnly: true,
    });
    const { DeleteOtpError } = await deleteOtpById(dupOtp.id);
    if (DeleteOtpError) {
      return response({
        status: 500,
        res: { message: "Unknown error occured" },
      });
    }
    return responseWithCookies;
  } catch (err: any) {
    return response({ status: 500, res: { message: "Internal server error" } });
  }
}
