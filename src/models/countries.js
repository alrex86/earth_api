const db = require("../common/db-helper");

const Country = {
  session: [],
  createCountry: async (payload) => {
    try {
      return await db.query("INSERT INTO countries set ?", payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  getCountryByUserId: async (userId) => {
    const payload = {
      userId,
    };

    try {
      const [rows] = await db.query("SELECT * FROM countries WHERE ?", payload);
      return rows;
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
};

module.exports = Country;
