import nodemailer from "nodemailer";
export async function sendMail({
  message,
  email,
  subject = "Bought Products",
}: {
  message: string;
  email: string;
  subject?: string;
}) {
  try {
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMP_EMAIL,
        pass: process.env.AUTH_KEY,
      },
    });

    var mailOptions = {
      from: `SauravShop ${process.env.COMP_EMAIL}`,
      to: email,
      subject: subject,
      html: message,
    };

    await transport.sendMail(mailOptions);
    return { SendMailSuccess: true };
  } catch (err: any) {
    return { SendMailUnkownError: err.message };
  }
}
