"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import { validateEmail } from "@/lib/utils";
import { checkEmail } from "@/lib/db";
import { sql } from '@vercel/postgres';
import { loginUser } from "./login";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    otp: formData.get("otp"),
  });

  if (!validatedFields.success) {
    // console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, otp } = validatedFields.data;

  const emailValidationError = validateEmail(email);
  if (emailValidationError) {
    return {
      errors: { email: [emailValidationError] },
    };
  }

  try {
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1;`;

    if (existingUser.rows.length > 0) {
      return {
        errors: { email: ["Email is already registered."] },
      };
    }

    const result = await checkEmail({ email });
    if (result.otp === otp) {
      const insertResult = await sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${password})
        RETURNING id;
      `;

      const user = insertResult.rows[0];

      if (!user) {
        throw new Error("User creation failed.");
      }

      loginUser(email, password)

      return { message: "Signup successful!" };
    } else {
      return {
        errors: { otp: ["OTP is invalid or expired."] },
      };
    }

  } catch (error) {
    console.error("Error creating user:", error);
    return {
      errors: { general: ["An error occurred while creating your account."] },
    };
  }
}

