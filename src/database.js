import {createPool} from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
export const pool = createPool(
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        ssl: {ca: fs.readFileSync('./src/DigiCertGlobalRootCA.crt.pem')}
    }
);