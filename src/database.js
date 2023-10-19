import {createPool} from 'mysql2/promise'
import fs from 'fs'
import dotenv from 'dotenv'
//import * as path from 'path';


dotenv.config()

//var path = require('path');
//const __filename = new URL(import.meta.url).pathname;
//const __dirname = path.dirname(__filename);
//const certificatePath = path.join(__dirname, 'DigiCertGlobalRootCA.crt.pem');
export const pool = createPool(
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        ssl: {ca: fs.readFileSync('./src/DigiCertGlobalRootCA.crt.pem')}
    }
)

/*export const pool = mysql.createConnection(config);

pool.connect(
    function (err) {
        if (err) {
            console.log("!!! Connot connect to database !!! Error:");
            throw err;
        } else {
            console.log("Database connection established")
        }
    }
);*/