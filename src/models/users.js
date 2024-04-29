const bcrypt = require("bcrypt");
const db = require("./../common/db-helper");
const jwt = require("jsonwebtoken");
const Country = require("./countries");

const User = {
  sessions: {},
  createUser: async (username, password) => {
    const payload = {
      username,
      password,
      bidbal: 0,
    };
    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(password, salt);

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
<<<<<<< HEAD
  getUserByUsername: async (username) => {
    const payload = [
      username,
    ]
  
    try {
      return await db.query("SELECT * FROM users WHERE username = ?", payload);
=======
  login: async (username, password) => {
    try {
      const payload = {
        username,
      };

      const [rows] = await db.query(
        "SELECT * FROM users WHERE ? LIMIT 1",
        payload
      );
      if (rows.length <= 0) {
        return {
          error: true,
          message: "Either username or password is incorrect.",
        };
      }

      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return {
          error: true,
          message: "Either username or password is incorrect.",
        };

      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      });

      // create user session
      user.password = undefined;
      User.session[user.id] = user;

      // create country session
      Country.session[user.id] = await Country.getCountryByUserId(user.id);
      console.log("user session: ", User.session);
      console.log("country session: ", Country.session);

      return { accessToken: token };
>>>>>>> e6d0a0227786bdd98046e4e2cddc7df8b7bf6d94
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
<<<<<<< HEAD
  getUserById: async (Id) => {
    const payload = [
      Id,
    ]
  
    try {
      return await db.query("SELECT * FROM users WHERE id = ?", payload);
=======
  getUserById: async (id) => {
    const payload = { "u.id": id };
    try {
      const [rows] = await db.query(
        "SELECT u.*, c.name, c.cash, c.networth, c.land, c.allmilitary, c.allresearch, c.allbuildings FROM users u LEFT JOIN countries c ON u.id = c.userId WHERE ?",
        payload
      );
      if (rows.length <= 0) {
        return {
          error: true,
          message: `No users found with id: ${id}`,
        };
      }
      const user = rows[0];
      // remove password
      user.password = undefined;

      return user;
>>>>>>> e6d0a0227786bdd98046e4e2cddc7df8b7bf6d94
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
<<<<<<< HEAD
  initiateSession: (userID, username) => {
    User.sessions[userID] = {
      userID: userID,
      username: username,
      countryId: 0
    }
    
  },
  login: async (username, password) => {},
=======
>>>>>>> e6d0a0227786bdd98046e4e2cddc7df8b7bf6d94
};

module.exports = User;
