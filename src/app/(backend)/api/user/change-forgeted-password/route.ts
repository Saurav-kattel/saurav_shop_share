import { decodeAcceptedOtpToken } from "@/app/services/api/user/otp/decodeAcceptedOtpToken";
import generateHash from "@/app/services/api/user/user/tokens/generateHash";
import { generateToken } from "@/app/services/api/user/user/tokens/generateToken";
import { updateUserPassword } from "@/app/services/api/user/user/updateUserPassword";
import { response } from "@/app/services/utils/response";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let { newPassword, confPassword } = await req.json();
  let verificationToken = req.headers.get("otp_verifcation_accepted");

  if (!verificationToken) {
    return response({
      status: 404,
      res: { message: "unable to find the auth token" },
    });
  }

  if (newPassword === "" || newPassword.length < 6) {
    return response({ status: 400, res: { message: "invalid new password" } });
  }
  if (confPassword === "" || confPassword.length < 6) {
    return response({
      status: 400,
      res: { message: "invalid confirm password" },
    });
  }

  if (newPassword !== confPassword) {
    return response({
      status: 400,
      res: { message: "confrim password didn't match" },
    });
  }

  const { payload, JwtDecodeError } = await decodeAcceptedOtpToken(
    verificationToken
  );

  if (!payload || JwtDecodeError) {
    return response({ status: 500, res: { message: "Unknown error occured" } });
  }

  const { hash, hashError } = await generateHash(newPassword);
  if (!hash || hashError) {
    return response({
      status: 500,
      res: { message: "unknown error occured" },
    });
  }

  const { UpdatePasswordError } = await updateUserPassword({
    userId: payload.userId as string,
    hash,
  });
  if (UpdatePasswordError) {
    return response({
      status: 500,
      res: { message: "unable to update passwor unknown error occured" },
    });
  }
  const resWithCookies = NextResponse.json(
    { res: { message: "updated password", success: true } },
    { status: 200 }
  );
  const token = await generateToken({
    userId: payload.userId as string,
    email: payload.email as string,
  });
  resWithCookies.cookies.set("auth", token.token);
  resWithCookies.cookies.delete("otp_verifcation_accepted");
  return resWithCookies;
}
