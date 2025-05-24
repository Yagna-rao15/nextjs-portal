import pool from '@/lib/db'

export default async function handler(req, res) {
  const result = await pool.query('SELECT NOW()')
  res.json(result.rows)
}

