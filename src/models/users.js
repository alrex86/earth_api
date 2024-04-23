const db = require("./../common/db-helper");

const User = {
  session: [],
  createUser: async (username, password) => {
    const payload = {
      username,
      password,
      bidbal: 0,
    };

    try {
      return await db.query("INSERT INTO users set ?", payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  removeUserById: async (id) => {
    const payload = { id };
    try {
      return await db.query("DELETE FROM users WHERE ?", payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  login: async (username, password) => {},
};

module.exports = User;
