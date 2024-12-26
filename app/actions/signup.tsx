"use server"

import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { validateEmail } from "@/lib/utils";
import { sql } from '@vercel/postgres';

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const emailValidationError = validateEmail(email);
  if (emailValidationError) {
    return {
      errors: { email: [emailValidationError] },
    };
  }

  try {
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1;`;
    if (existingUser && existingUser.rows && existingUser.rows.length > 0) {
      return {
        errors: { email: ["Email is already registered."] },
      };
    }

    const result = await sql`
      INSERT INTO users (name, email, password) 
      VALUES (${name}, ${email}, ${password}) 
      RETURNING id;
    `;

    const user = result.rows[0];
    if (!user) {
      throw new Error("User creation failed.");
    }
    return { message: "Signup successful!" };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      message: "An error occurred while creating your account.",
    };
  }
}

