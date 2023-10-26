import nodemailer from "nodemailer";
export async function sendMail({ message, email }: { message: string; email: string; }) {
    try {
        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "onlineshopstore98@gmail.com",
                pass: "mzsilxuypwllufjj",
            },
        });

        var mailOptions = {
            from: "onlineshopstore@98gmail.com",
            to: email,
            subject: "Bought Produccts",
            html: message
        };

        let res = await transport.sendMail(mailOptions);
        if (res.rejected) {
            return { MailRejected: "email has been rejected" };
        }
        return { SendMailSuccess: true };

    } catch (err: any) {
        return { SendMailUnkownError: err };
    }
}