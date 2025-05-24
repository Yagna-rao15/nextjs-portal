'use server';

import pool from "@/lib/db";
import { redirect } from "next/navigation";
// import { createSession } from "@/lib/session";
// import { cookies } from "next/headers";

export async function loginUser(email: string, password: string) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 LIMIT 1",
    [email]
  );

  if (result.rows.length === 0 || result.rows[0].password !== password) {
    throw new Error("Invalid credentials.");
  }

  // await createSession(email);
  redirect("/home");
}

