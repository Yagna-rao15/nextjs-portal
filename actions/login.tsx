"use server";

import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { AccessTokenPayload, generateAccessToken, generateRefreshToken, RefreshTokenPayload } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function loginUser(email: string, password: string) {
  const result = await pool.query("SELECT email, password, id, role FROM users WHERE email = $1 LIMIT 1", [email]);

  const user = result.rows[0];

  try {
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials.");
    }
  } catch (error) {
    console.warn(error);
    return {
      message: "Invalid credentials",
    };
  }

  const accessTokenPayload: AccessTokenPayload = {
    email: user.email,
    userId: user.id,
    role: user.role,
  };
  const refreshTokenPayload: RefreshTokenPayload = {
    userId: user.id,
    tokenVersion: 1,
  };

  const accessToken = generateAccessToken(accessTokenPayload);
  const refreshToken = generateRefreshToken(refreshTokenPayload);
  const cookieStore = await cookies();

  try {
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 15, // 15 minutes
      sameSite: "strict",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict",
    });
    return {
      message: "Success",
    };
  } catch (error) {
    console.warn(error);
    return {
      messgae: "Unable to attch Cookie",
    };
  }
}
