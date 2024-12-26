import { sql } from '@vercel/postgres';

export async function initializeUsersTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Users table initialized successfully.");
  } catch (error) {
    console.error("Error initializing users table:", error);
    throw new Error("Failed to initialize users table.");
  }
}

