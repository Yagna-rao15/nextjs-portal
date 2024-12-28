import { z } from 'zod'
import { JWTPayload } from 'jose'

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long." })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
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

export type FormState =
  | {
    errors?: {
      name?: string[]
      email?: string[]
      password?: string[]
      confirmPassword?: string[]
    }
    message?: string
  }
  | undefined

export interface SessionPayload extends JWTPayload {
  user: {
    id: string,
    expiresAt: Date | number,
  }
  // JWT fields are inherited from JWTPayload:
  // iat?: number
  // exp?: number 
  // jti?: string
}
