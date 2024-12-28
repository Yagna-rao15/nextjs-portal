"use server";

import { sql } from '@vercel/postgres';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function loginUser(email: string, password: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1;
  `;
  if (result.rows.length === 0 || result.rows[0].password !== password) {
    throw new Error("Invalid credentials.");
  }

  await createSession(email);
  redirect('/test')
}

