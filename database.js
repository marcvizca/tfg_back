import mysql from 'mysql2'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

var config = 
{
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
}

const connected = mysql.createConnection(config);

connected.connect(
    function (err) {
        if (err) {
            console.log("!!! Connot connect to database !!! Error:");
            throw err;
        } else {
            console.log("Database connection established");
            readData();
        }
    }
);

function readData() {
    connected.query('SELECT * from Team',
    function(err, results, fields) {
        if (err) throw err;
        else console.log(results);
    })

}