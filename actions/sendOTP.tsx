"use server";

import nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer";
import pool from "@/lib/db";
import { checkSVNITEmail } from "@/lib/utils";

export async function sendOTP({ email }: { email: string }) {
  try {
    const emailValidationError = checkSVNITEmail(email);
    if (emailValidationError) {
      return {
        success: false,
        message: "Enter Institute Email of SVNIT",
      };
    }

    const result = await pool.query(
      "SELECT * FROM otp WHERE email = $1 AND created_at >= NOW() - INTERVAL '10 minutes'",
      [email],
    );

    let otp: string;

    if (result.rows.length > 0 && result.rows[0].otp) {
      console.log(`OTP for ${email} is already: ${result.rows[0].otp}`);
      otp = result.rows[0].otp;
    } else {
      otp = Math.floor(100000 + Math.random() * 900000).toString();
      const result = await pool.query(
        "INSERT INTO otp (email, otp, created_at) VALUES ($1, $2, NOW()) ON CONFLICT (email) DO UPDATE SET otp = EXCLUDED.otp, created_at = NOW();",
        [email, otp],
      );
      console.log(result);
      if (result) {
        console.log("OTP inserted/updated successfully.");
      } else {
        console.warn("Insert/update did not affect any rows.");
      }

      console.log("OTP added successfully!");
    }

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });

    await new Promise<void>((resolve, reject) => {
      transporter.verify((error: Error | null) => {
        if (error) {
          console.error("Transporter verification failed:", error);
          reject(error);
        } else {
          console.log("Transporter is ready to send messages.");
          resolve();
        }
      });
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Your OTP for Signup",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    // await new Promise<void>((resolve, reject) => {
    //   transporter.sendMail(
    //     mailOptions,
    //     (err: Error | null, info: SentMessageInfo) => {
    //       if (err) {
    //         console.error("Error sending email:", err);
    //         reject(err);
    //       } else {
    //         console.log("Email sent successfully:", info);
    //         resolve();
    //       }
    //     },
    //   );
    // });

    return { success: true };
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return { success: false, message: "Failed to send OTP." };
  }
}
