// "use server";
//
// import { SignupFormSchema, FormState } from "@/lib/definitions";
// import pool from "@/lib/db";
// import { checkSVNITEmail } from "@/lib/utils";
// import { sql } from "@vercel/postgres";
//
// export async function updatePassword(state: FormState, formData: FormData) {
//   const validatedFields = SignupFormSchema.safeParse({
//     email: formData.get("email"),
//     password: formData.get("password"),
//     confirmPassword: formData.get("confirmPassword"),
//     otp: formData.get("otp"),
//   });
//
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }
//
//   const { name, email, password, otp } = validatedFields.data;
//
//   const emailValidationError = checkSVNITEmail(email);
//   if (emailValidationError) {
//     return {
//       errors: { email: [emailValidationError] },
//     };
//   }
//
//   try {
//     const result = await pool.query(
//       "SELECT otp FROM otp WHERE email = $1 LIMIT 1",
//       [email],
//     );
//     if (result.row[0].otp === otp) {
//       const insertResult = await sql`
//         INSERT INTO users (name, email, password)
//         VALUES (${name}, ${email}, ${password})
//         ON CONFLICT (email)
//         DO UPDATE SET
//           name = ${name},
//           password = ${password}
//         RETURNING id;
//       `;
//
//       const user = insertResult.rows[0];
//       if (!user) {
//         throw new Error("User creation failed.");
//       }
//
//       return { message: "Password Changed successful!" };
//     } else {
//       return {
//         errors: { otp: ["OTP is invalid or expired."] },
//       };
//     }
//   } catch (error) {
//     console.error("Error changing Password:", error);
//     return {
//       errors: { general: ["An error occurred while creating your account."] },
//     };
//   }
// }
