"use server";

import nodemailer from "nodemailer";
import { addOTP, checkEmail } from "@/lib/db";
import { validateEmail } from "@/lib/utils";

export async function sendOTP({ email }: { email: string }) {
  let otp: string | undefined;

  try {
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      return {
        success: false,
        message: "Enter Institute Email"
      };
    }

    const result = await checkEmail({ email });
    if (result.otp) {
      console.log(`OTP for ${email} is already: ${result.otp}`);
      otp = result.otp;
    } else {
      otp = Math.floor(100000 + Math.random() * 900000).toString();
      await addOTP({ email }, { otp });
      console.log("OTP added successfully!");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Your OTP for Signup",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return { success: false, message: "Failed to send OTP." };
  }
}

