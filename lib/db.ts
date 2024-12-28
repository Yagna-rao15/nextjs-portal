import { sql } from '@vercel/postgres';

export async function addOTP({ email }: { email: string }, { otp }: { otp: string }) {
  try {
    await sql`
      INSERT INTO otp (email, otp, expiry)
      VALUES (${email}, ${otp}, NOW() + INTERVAL '10 Minutes')
    `;
    console.log("Users table initialized successfully.");
  } catch (error) {
    console.error("Error initializing users table:", error);
    throw new Error("Failed to initialize users table.");
  }
}

export async function checkEmail({ email }: { email: string }) {
  try {
    const result = await sql`
      SELECT otp 
      FROM otp
      WHERE email = ${email}
      AND expiry > NOW()
      LIMIT 1
    `;

    if (result.rowCount) {
      return { otp: result.rows[0].otp };
    } else {
      return { message: "Email not found or OTP expired." };
    }
  } catch (error) {
    console.error("Error checking email in OTP table:", error);
    throw new Error("Failed to check email.");
  }
}
