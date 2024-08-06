import pg from 'pg';

const { Pool } = pg

export const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'portafolio',
    password: process.env.POSGRESQL_PASSWORD || 'admin',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})