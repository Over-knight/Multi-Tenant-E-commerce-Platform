import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Schema } from 'mongoose';
dotenv.config();

export const registeryPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT || 3306),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});