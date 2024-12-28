"use server";

import { sql } from '@vercel/postgres';

export async function loginUser(email: string, password: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1;
  `;
  if (result.rows.length === 0 || result.rows[0].password !== password) {
    throw new Error("Invalid credentials.");
  }
  return { message: "Login successful!" };
}

