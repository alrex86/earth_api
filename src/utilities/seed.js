require("dotenv").config();
const db = require("./../common/db-helper");
const sql = [];

console.log(`Database: ${process.env.DB_DATABASE}\n`);
console.log("Seeding Started.. \n");

// create users table
sql.push({
  name: "user table",
  query: `
CREATE TABLE IF NOT EXISTS users 
  (id INT(11) AUTO_INCREMENT PRIMARY KEY, 
  username VARCHAR(16) NOT NULL UNIQUE, 
  password VARCHAR(100) NOT NULL, 
  bidbal INT(11) NOT NULL);
`,
});

// create tokens table
sql.push({
  name: "tokens table",
  query: `
CREATE TABLE IF NOT EXISTS tokens 
  (id INT(11) AUTO_INCREMENT PRIMARY KEY, 
  userid INT(11) NOT NULL, 
  token VARCHAR(5) NOT NULL);
`,
});

// create countries table
sql.push({
  name: "countries table",
  query: `
CREATE TABLE IF NOT EXISTS countries 
  (id INT(11) AUTO_INCREMENT PRIMARY KEY, 
  userid INT(11) NOT NULL, 
  allbuildings VARCHAR(500) NOT NULL, 
  allresearch VARCHAR(500) NOT NULL, 
  allmilitary VARCHAR(500) NOT NULL, 
  land INT(11) NOT NULL, 
  networth INT(11) NOT NULL, 
  cash INT(11) NOT NULL, 
  name VARCHAR(20) NOT NULL);
`,
});

for (const seed of sql) {
  try {
    console.log("Seeding ", seed.name);
    db.execute(seed.query);
  } catch (err) {
    console.log(err);
  }
}
console.log("\nSeeding Completed..");
