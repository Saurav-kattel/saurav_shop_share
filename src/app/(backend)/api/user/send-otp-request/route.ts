import { sendMail } from "@/app/services/api/admin/sendMail";
import { createOtp } from "@/app/services/api/user/createOtp";
import { deleteOtpById } from "@/app/services/api/user/deleteOtpById";
import { generateOtp } from "@/app/services/api/user/generateOtp";
import { getOtpByUserId } from "@/app/services/api/user/getOtpByUserId";
import { getUser } from "@/app/services/api/user/getUser";
import { response } from "@/app/services/utils/response";

export async function POST(req: Request) {
  try {
    let { email } = await req.json();
    if (!email || email === "") {
      return response({ status: 400, res: { message: "Email Not Found" } });
    }

    let user = await getUser({ email });
    if (!user) {
      return response({ status: 404, res: { message: "User Not Found" } });
    }

    let otp = generateOtp();

    let message = `<h1>Otp-change password </h1>\n <p>your otp is: <em>${otp}</em>\n <h3 style={{color: red}}> Please don't share your otp</h3>`;
    let { dupOtp, OtpFetchError } = await getOtpByUserId(user.id);

    if (OtpFetchError) {
      return response({
        status: 500,
        res: { message: "An unknown error occured" },
      });
    }

    if (!dupOtp) {
      let { newOtp, OtpCreationError } = await createOtp({
        userId: user.id,
        otp,
      });

      if (!newOtp || OtpCreationError) {
        return response({
          status: 500,
          res: { message: "An Unknown Error Occured Try Again" },
        });
      }

      let { SendMailUnkownError, SendMailSuccess } = await sendMail({
        message,
        email: user.email,
        subject: "OTP",
      });

      if (SendMailUnkownError || !SendMailSuccess) {
        return response({
          status: 500,
          res: { message: "An Unknon error occured please try again" },
        });
      }

      return response({
        status: 200,
        res: { success: true, message: "sent mail successfully" },
      });
    }

    let { DeleteOtpError } = await deleteOtpById(dupOtp.id);
    if (DeleteOtpError) {
      return response({
        status: 500,
        res: { message: "An unknown error occured" },
      });
    }

    let { newOtp, OtpCreationError } = await createOtp({
      userId: user.id,
      otp,
    });

    if (OtpCreationError || !newOtp) {
      return response({
        status: 500,
        res: { message: "An unknown error occured" },
      });
    }

    let { SendMailSuccess, SendMailUnkownError } = await sendMail({
      message,
      email: user.email,
      subject: "OTP",
    });

    if (!SendMailSuccess || SendMailUnkownError) {
      return response({
        status: 500,
        res: { message: "An unknown error occured" },
      });
    }

    return response({
      status: 200,
      res: { success: true, message: "sent mail successfully" },
    });
  } catch (err) {
    return response({ status: 500, res: { message: "internal server error" } });
  }
}
