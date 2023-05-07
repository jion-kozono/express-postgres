import pkg from 'pg';
const { Client } = pkg;

export const client = new Client({
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: {
        sslmode: 'require',
        rejectUnauthorized: false
    }
});
