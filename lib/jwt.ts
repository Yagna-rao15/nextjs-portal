import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface AccessTokenPayload {
  email: string;
  userId: string;
  role: "Admin" | "Faculty" | "Student" | "Warden" | "Accountant";
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  userId: string;
  tokenVersion: number;
  iat?: number;
  exp?: number;
}

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export function generateAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}

export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as AccessTokenPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as RefreshTokenPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserEmailFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  if (!token?.value) return null;

  try {
    const payload = verifyAccessToken(token.value);
    return payload?.email || null;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}
