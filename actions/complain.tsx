// "use server";
//
// import { insertComplaint } from "@/lib/db";
// import { z } from "zod";
//
// const complainSchema = z.object({
//   email: z.string().email(),
//   complainType: z.string(),
//   hostel: z.string(),
//   name: z.string(),
//   room: z.string(),
//   mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
//   description: z.string(),
// });
//
// export async function submitComplain(data: FormData) {
//   try {
//     const input = {
//       email: data.get("email") as string,
//       complainType: data.get("complainType") as string,
//       hostel: data.get("hostel") as string,
//       name: data.get("name") as string,
//       room: data.get("room") as string,
//       mobile: data.get("mobile") as string,
//       description: data.get("description") as string,
//     };
//
//     const validatedData = complainSchema.parse(input);
//
//     await insertComplaint(validatedData)
//     console.log("Complain data:", validatedData);
//
//     return { success: true, message: "Complain submitted successfully!" };
//   } catch (error) {
//     console.error("Error submitting complain:", error);
//
//     if (error instanceof z.ZodError) {
//       return { success: false, error: error.errors };
//     }
//
//     return { success: false, error: "An error occurred while submitting the complain." };
//   }
// }
//
