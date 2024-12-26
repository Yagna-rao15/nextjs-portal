
"use server";

import { SignupFormSchema, FormState } from "@/app/lib/definitions";

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

  // Call provider or database logic to create a user...
  console.log("Validated signup data:", validatedFields.data);
  return { message: "Signup successful!" };
}

