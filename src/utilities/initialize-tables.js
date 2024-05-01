require("dotenv").config();
const db = require("../common/db-helper");
const bcrypt = require("bcrypt");
const {
  ALL_BUILDINGS,
  ALL_MILITARY,
  ALL_RESEARCH,
} = require("../common/enums/country");

const initialize = async () => {
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
      await db.execute(seed.query);
    } catch (err) {
      console.log(err);
    }
  }
};

const resetIds = async () => {
  const sql = [];
  sql.push({
    name: "user table",
    query: "ALTER TABLE users AUTO_INCREMENT = 1",
  });

  sql.push({
    name: "tokens table",
    query: "ALTER TABLE tokens AUTO_INCREMENT = 1",
  });

  sql.push({
    name: "countries table",
    query: "ALTER TABLE countries AUTO_INCREMENT = 1",
  });

  for (const seed of sql) {
    try {
      await db.execute(seed.query);
    } catch (err) {
      console.log(err);
    }
  }  
}

const setValuesUsers = async () => {
  const salt = await bcrypt.genSalt(10);
  let encryptedPassword = await bcrypt.hash('hayss', salt);
  const sql = [];
  sql.push({
    name: "user table",
    query: "INSERT INTO users SET ?",
    value: {username: 'user1', password: encryptedPassword}
  });

  sql.push({
    name: "tokens table",
    query: "INSERT INTO users SET ?",
    value: {username: 'user2', password: encryptedPassword}
  });

  sql.push({
    name: "countries table",
    query: "INSERT INTO users SET ?",
    value: {username: 'user3', password: encryptedPassword}
  });

  
  for (const seed of sql) {
    try {
      seed.value.bidbal = 0;
      await db.query(seed.query, seed.value);
    } catch (err) {
      console.log(err);
    }
  }  
}

const setValuesTokens = async () => {
  const sql = [];
  

  sql.push({
    name: "countries table",
    query: "INSERT INTO tokens SET ?",
    value: {userid: 1, token: 'hayss'}
  });

  sql.push({
    name: "countries table",
    query: "INSERT INTO tokens SET ?",
    value: {userid: 3, token: 'hayss'}
  });

  for (const seed of sql) {
    try {
      // seed.value.bidbal = 0;
      await db.query(seed.query, seed.value);
    } catch (err) {
      console.log(err);
    }
  }  
}

const setValuesCountries = async () => {
  const sql = [];
  
  
  sql.push({
    
    query: "INSERT INTO countries SET ?",
    value: {
      userid: 5,
      allbuildings: JSON.stringify(ALL_BUILDINGS),
      allresearch: JSON.stringify(ALL_RESEARCH),
      allmilitary: JSON.stringify(ALL_MILITARY),
      land: 0,
      networth: 0,
      cash: 500000,
      population: 5000,
      turns: 20,
      name: 'hey',
    }
  });

  

  for (const seed of sql) {
    try {
      // seed.value.bidbal = 0;
      await db.query(seed.query, seed.value);
    } catch (err) {
      console.log(err);
    }
  }  
}

module.exports = { 
  initialize,
  resetIds,
  setValuesUsers,
  setValuesTokens,
  setValuesCountries
 };
