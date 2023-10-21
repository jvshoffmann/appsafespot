require('dotenv').config();
console.log(process.env.DB_HOST);
const { Client } = require('pg');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432
};

const client = new Client(dbConfig);
client.connect();

module.exports = client;
