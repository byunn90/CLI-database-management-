const mysql = require("mysql2");
require("dotenv").config();
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "employee_db",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("Connected to database.");
});

module.exports = connection;
