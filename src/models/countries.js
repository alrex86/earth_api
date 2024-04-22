const db = require("../common/db-helper");

const createCountry = async (payload) => {
  try {
    return await db.query("INSERT INTO countries set ?", payload);
  } catch (err) {
    return { error: true, message: err.message };
  }
};

const getCountryByUserId = async (userId) => {
  const payload = {
    userId,
  };

  try {
    return await db.query("SELECT * FROM countries WHERE ?", payload);
  } catch (err) {
    return { error: true, message: err.message };
  }
};

module.exports = {
  createCountry,
  getCountryByUserId,
};
