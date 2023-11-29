import { decodeAcceptedOtpToken } from "@/app/services/api/user/otp/decodeAcceptedOtpToken";
import { getUser } from "@/app/services/api/user/user/getUser";
import generateHash from "@/app/services/api/user/user/tokens/generateHash";
import verifyPassword from "@/app/services/api/user/user/tokens/verifyPassword";
import { updateUserPassword } from "@/app/services/api/user/user/updateUserPassword";
import { response } from "@/app/services/utils/response";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let { password, newPassword, confPassword } = await req.json();
  let verificationToken = req.headers.get("otp_verifcation_accepted");

  if (!verificationToken) {
    return response({
      status: 404,
      res: { message: "unable to find the auth token" },
    });
  }

  if (password === "" || password.length < 6) {
    return response({ status: 400, res: { message: "invalid password" } });
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

  let user = await getUser({
    id: payload.userId as string,
    withPassword: true,
  });

  if (!user) {
    return response({
      status: 404,
      res: { message: "user not found" },
    });
  }

  const { isCorrectPassword, verificationError } = await verifyPassword({
    hash: user.password,
    password,
  });

  if (verificationError) {
    return response({
      status: 500,
      res: { message: "unknown error occured" },
    });
  }

  if (!isCorrectPassword) {
    return response({
      status: 401,
      res: { message: "wrong password" },
    });
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
  resWithCookies.cookies.delete("otp_verifcation_accepted");
  return resWithCookies;
}
