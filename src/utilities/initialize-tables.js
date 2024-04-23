require("dotenv").config();
const db = require("../common/db-helper");
const initialize = () => {
  const sql = [];
  sql.push({
    name: "user table",
    query: "DELETE FROM users",
  });

  sql.push({
    name: "tokens table",
    query: "DELETE FROM tokens",
  });

  sql.push({
    name: "countries table",
    query: "DELETE FROM countries",
  });

  for (const seed of sql) {
    try {
      db.execute(seed.query);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { initialize };
