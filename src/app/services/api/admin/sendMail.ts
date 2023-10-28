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

        await transport.sendMail(mailOptions);
        return { SendMailSuccess: true };

    } catch (err: any) {
        return { SendMailUnkownError: err.message };
    }
}