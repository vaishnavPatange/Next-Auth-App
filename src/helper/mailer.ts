import nodemailer from "nodemailer";
import User from "@/models/userModel";
import { v4 as uuidv4 } from "uuid";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const token = uuidv4();

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: token,
          verifyTokenExpiry: Date.now() + 1000 * 60 * 30, // 30 minutes
        },
        { new: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 1000 * 60 * 30,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USERNAME,
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });

    const redirectPath = emailType === "VERIFY" ? "verifyemail" : "resetpassword";

    const mailOptions = {
      from: "auth.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${redirectPath}/?token=${token}">here</a>
              to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
              or copy and paste the link below in your browser <br/>
              ${process.env.DOMAIN}/${redirectPath}/?token=${token}
            </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
