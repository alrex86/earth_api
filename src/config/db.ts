import mysql from "mysql2";

const dbData = {
  connection: null as mysql.Connection,
};

const db = {
  dbData: dbData,
  createConnection: () => {
    db.dbData.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
    });
  },
  createTables: () => {
    let query =
      "CREATE TABLE IF NOT EXISTS users (id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(16) NOT NULL, password VARCHAR(100) NOT NULL, bidbal INT(11) NOT NULL)";
    db.dbData.connection.query(query, (err, result) => {
      if (err) throw err;
    });

    query =
      "CREATE TABLE IF NOT EXISTS tokens (id INT(11) AUTO_INCREMENT PRIMARY KEY, userid INT(11) NOT NULL, token VARCHAR(5) NOT NULL)";
    db.dbData.connection.query(query, (err, result) => {
      if (err) throw err;
    });

    query =
      "CREATE TABLE IF NOT EXISTS countries (id INT(11) AUTO_INCREMENT PRIMARY KEY, userid INT(11) NOT NULL, allbuildings VARCHAR(500) NOT NULL, allresearch VARCHAR(500) NOT NULL, allmilitary VARCHAR(500) NOT NULL, land INT(11) NOT NULL, networth INT(11) NOT NULL, cash INT(11) NOT NULL, name VARCHAR(20) NOT NULL)";
    db.dbData.connection.query(query, (err, result) => {
      if (err) throw err;
    });

    console.log("Database initiated successfully.");
  },
};

export default db;
