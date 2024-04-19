const database = require("./../config/db");

const query = async (sqlQuery, values) => {
  const databaseConnection = await database.initiateDatabaseConnection();
  try {
    return await databaseConnection.query(sqlQuery, values);
  } catch (err) {
    return { error: true, message: err.message };
  }
};

module.exports = {
  query,
};
