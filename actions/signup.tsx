"use server";

import { SignupFormSchema } from "@/lib/definitions";
import { checkSVNITEmail } from "@/lib/utils";
import pool from "@/lib/db";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

type Field = "email" | "otp" | "password" | "confirmPassword";
type Errors = Record<Field | "general", string | null>;

type SignInResponse = {
  status: number;
  message?: string;
  data?: string;
  error?: string | Errors;
};

export async function signup(
  formData: FormData,
  use: "signup" | "forgot",
): Promise<SignInResponse> {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    otp: formData.get("otp"),
  });

  if (!validatedFields.success) {
    const flattened = validatedFields.error.flatten();

    const fieldErrors: Errors = {
      email: flattened.fieldErrors.email
        ? flattened.fieldErrors.email[0]
        : null,
      otp: flattened.fieldErrors.otp ? flattened.fieldErrors.otp[0] : null,
      password: flattened.fieldErrors.password
        ? flattened.fieldErrors.password[0]
        : null,
      confirmPassword: flattened.fieldErrors.confirmPassword
        ? flattened.fieldErrors.confirmPassword[0]
        : null,
      general: null,
    };

    return {
      status: 400,
      error: fieldErrors,
    };
  }

  const { email, password, otp } = validatedFields.data;

  const emailValidationError = checkSVNITEmail(email);
  if (emailValidationError) {
    return {
      status: 400,
      error: {
        email: emailValidationError,
        password: null,
        otp: null,
        confirmPassword: null,
        general: null,
      },
    };
  }

  try {
    if (use != "forgot") {
      const existingUser = await pool.query(
        "SELECT email FROM users WHERE email = $1 LIMIT 1;",
        [email],
      );

      if (existingUser.rows.length > 0) {
        return {
          status: 403,
          error: {
            email: "Email is already registered.",
            otp: null,
            password: null,
            confirmPassword: null,
            general: null,
          },
        };
      }
    }

    const result = await pool.query(
      "SELECT * FROM otp WHERE email = $1 AND created_at > NOW() - INTERVAL '10 minutes'  LIMIT 1;",
      [email],
    );
    if (result.rows[0].otp === otp) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertResult = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET email = $1, password = $2 RETURNING id;",
        [email, hashedPassword],
      );

      const user = insertResult.rows[0];

      if (!user) {
        throw new Error("User creation failed.");
      }
    } else {
      return {
        status: 401,
        error: {
          otp: "OTP is invalid or expired.",
          email: null,
          password: null,
          confirmPassword: null,
          general: null,
        },
      };
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      status: 400,
      error: {
        otp: null,
        password: null,
        confirmPassword: null,
        email: null,
        general: "An Error occurred, Please try again Later",
      },
    };
  } finally {
    redirect("/login");
  }
}
