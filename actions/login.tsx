"use server";

import pool from "@/lib/db";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  RefreshTokenPayload,
  TokenPayload,
} from "@/lib/jwt";
import { cookies } from "next/headers";

export async function loginUser(email: string, password: string) {
  const result = await pool.query(
    "SELECT email, password, id FROM users WHERE email = $1 LIMIT 1",
    [email],
  );

  const user = result.rows[0];

  if (
    !user ||
    !user.password ||
    !(await bcrypt.compare(password, user.password))
  ) {
    throw new Error("Invalid credentials.");
  }

  const accessPayload: TokenPayload = {
    email: user.email,
    userId: user.id,
  };

  const refreshPayload: RefreshTokenPayload = {
    userId: user.id,
    tokenVersion: 1,
  };

  const accessToken = generateAccessToken(accessPayload);
  const refreshToken = generateRefreshToken(refreshPayload);
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 150, // 150 minutes
    sameSite: "strict",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "strict",
  });

  redirect("/home");
}
