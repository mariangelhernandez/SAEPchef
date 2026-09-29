import pg from 'pg';
import dotenv from 'dotenv'


const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSAWORD,
    database: process.env.DB_NAME
});

export const query = (text, params) => pool.query(text,params);





