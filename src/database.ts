import pg from 'pg';

const { Pool } = pg

const pool = new Pool({
    host: 'localhost',
    user: 'gabo',
    database: 'portafolio',
    password: process.env.POSGRESQL_PASSWORD || 'admin',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export const query = async (text:string, params?:(string | number | boolean | null)[]) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  }