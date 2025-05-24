import { Pool } from 'pg'

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  user: "postgres",
  host: "localhost",       // or your docker network IP
  database: "postgres",    // or your actual DB name
  password: "password",
  port: 5432,
})

export default pool
