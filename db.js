const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "2003",
  database: process.env.DB_NAME || "fooddb",
  multipleStatements: true, // Enable multiple statements
  port: process.env.DB_PORT || 3307, // Default MySQL port
});

db.connect((err) => {
  if (err) throw err;
  console.log(`MySQL connected successfully!`);
});

module.exports = db;