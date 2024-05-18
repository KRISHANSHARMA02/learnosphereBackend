require('dotenv').config();
const mysql = require('mysql');

const sqlconnection = mysql.createConnection({
  host: process.env.DB_HOST ,       // Use environment variable
  user: process.env.DB_USER,       // Use environment variable
  password: process.env.DB_PASSWORD, // Use environment variable
  database: process.env.DB_NAME    // Use environment variable
});

sqlconnection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});
 
module.exports = sqlconnection;