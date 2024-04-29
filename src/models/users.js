const db = require("./../common/db-helper");

const User = {
  sessions: {},
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
  getUserByUsername: async (username) => {
    const payload = [
      username,
    ]
  
    try {
      return await db.query("SELECT * FROM users WHERE username = ?", payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  getUserById: async (Id) => {
    const payload = [
      Id,
    ]
  
    try {
      return await db.query("SELECT * FROM users WHERE id = ?", payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  initiateSession: (userID, username) => {
    User.sessions[userID] = {
      userID: userID,
      username: username,
      countryId: 0
    }
    
  },
  login: async (username, password) => {},
};

module.exports = User;
