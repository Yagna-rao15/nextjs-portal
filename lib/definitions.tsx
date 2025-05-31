import { z } from "zod";

export const SignupFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-zA-Z]/, {
        message: "Password must Contain at least one letter.",
      })
      .regex(/[0-9]/, { message: "Password must Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string(),
    otp: z.string().length(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });

export const ComplaintFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  category: z.enum(["plumbing", "electrical", "internet", "cleaning", "security", "mess", "others"], {
    message: "Select appropriat category",
  }),
  name: z.string().min(1, { message: "Enter your name" }),
  mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
  building: z.enum(["bhabha", "swamy", "gajjar", "abvb", "tagore", "mtb", "raman", "sarabhai"], {
    message: "Select appropriat hostel",
  }),
  floor: z.string(),
  room: z.string(),
  location: z.enum(["room", "bathroom", "corridor", "common", "mess", "other"], {
    message: "Select appropriat location type",
  }),
  description: z.string().min(10, "Description too short"),
});

export type ComplaintFormValues = z.infer<typeof ComplaintFormSchema>;
