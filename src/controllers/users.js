
require("dotenv").config();
const Users = require("./../models/users");
const Tokens = require("./../models/tokens");
const otherHelper = require("./../common/other-helper");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Countries = require("../models/countries");

const register = async (req, res) => {
  const { username, password } = req.body;
  const validateUsername = isUsernameSafe(username);

  if (validateUsername.error) {
    return res.status(400).json({ validateUsername });
  }

  
  const salt = await bcrypt.genSalt(10);
  if(process.env.NODE_ENV == 'test'){
    
    salt = 'hehey'; 
  }
  let encryptedPassword = await bcrypt.hash(password, salt);
  const user = await Users.createUser(username, encryptedPassword);
  if (user.error) {
    console.log("User Registration Error: ", user.message);
    return res.status(500).json({
      error: true,
      message: "Unable to complete registration. Please contact support team.",
    });
  }

  return res.json(user);
};

const getUserData = async (req, res) => {
  console.log('get user data');
}

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await Users.getUserById(id);
  if (user.error) {
    console.log("User Get User Data Error: ", user.message);
    return res.status(500).json(user);
  }

  return res.json(user);
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password){
    return res.status(400).json({
      error: true,
      message: "Invalid request. Please supply missing username and password.",
    });   
  }

  
  const userRes = await Users.getUserByUsername(username);
  if (userRes.error) {
    console.log("User Login Error: ", userRes.message);
    return res.status(500).json({
      error: true,
      message: "Login error.",
    });
  }
  
  const users = userRes[0];
  // Check if user exist
  if(users.length == 0){
    
    return res.status(500).json({
      error: true,
      message: "User does not exist.",
    });
  }

  // Check if password is correct
  const user = users[0];
  console.log('password: ', password);
  console.log('password db: ', user.password);
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return {
      error: true,
      message: "Either username or password is incorrect.",
    };
  // if(user.password != password){
  //   return res.status(500).json({
  //     error: true,
  //     message: "Incorrect password.",
  //   }); 
  // }

  let countryRes = await Countries.getCountryByUserId(user.id);
  if (countryRes.error) {
    console.log("Country Query Error: ", countryRes.message);
    return res.status(500).json({
      error: true,
      message: "Country Query Error.",
    });
  }
  
  const countries = countryRes[0];
  
  let tokenStr = otherHelper.randomStr(5);
  
  if(process.env.NODE_ENV == 'test'){
    
    tokenStr = 'hehey'; 
  }

  const tokenRes = await Tokens.createToken(tokenStr, user.id);
  // Check if theres token save error
  if(tokenRes.error){
    console.log("Token error: ", tokenRes.error);
    return res.status(500).json({
      error: true,
      message: "Token error.",
    });
  }
  
  console.log('token str: ', tokenRes);
  Tokens.initiateSession(tokenStr, user.id, tokenRes[0].insertId);
  Users.initiateSession(user.id, user.username);
  
  let countryData = null;
  if(countries.length > 0){
    const country = countries[0];
    if(Countries.sessions[country.id] == null){
      Countries.initiateSession(
        user.id, 
        country.id, 
        country.land, 
        country.networth, 
        country.cash, 
        JSON.parse(country.allbuildings),
        JSON.parse(country.allresearch),
        JSON.parse(country.allmilitary)
      )
    }

    countryData = Countries.sessions[country.id];
    
  }

  let userData = {
    userID: user.id,
    
    username: user.username,
    
    token: tokenStr,
    tokenID: tokenRes[0].insertId,
    country: 5,
    
  } 

  console.log('user ddata: ', userData);

  let jwtToken = jwt.sign({userData: userData}, process.env.TOKEN_SECRET, {noTimestamp : true});
  
  return res.json({token: jwtToken, userData: Users.sessions[user.id], countryData: countryData});
  
  
};

const login2 = async (req, res) => {
  const { username, password } = req.body;
  const validateUsername = isUsernameSafe(username);

  if (validateUsername.error) {
    return res.status(400).json({ validateUsername });
  }

  const user = await Users.login(username, password);
  if (user.error) {
    console.log("User Login Error: ", user.message);
    return res.status(500).json(user);
  }

  res.json(user);
}

function isUsernameSafe(username) {
  // Check if the username is null or empty
  if (!username) {
    return { error: true, message: "Username cannot be empty" };
  }

  // Check if the username length is between 4 and 32 characters
  if (username.length < 4 || username.length > 32) {
    return {
      error: true,
      message: "Username must be between 4 and 32 characters",
    };
  }

  // Check if the username contains only alphanumeric characters and underscores
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      error: true,
      message: "Username can only contain letters, numbers, and underscores",
    };
  }

  // All checks passed, username is safe
  return { error: false };
}

module.exports = {
  login,
  register,
  getUserById,
  getUserData
};
