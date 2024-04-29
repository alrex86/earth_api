const db = require("./../common/db-helper");

const Token = {
  sessions: {},
  createToken: async (token, userID) => {
    const payload = {
      token,
      userid: userID,
      
    };

    try {
      return await db.query("INSERT INTO tokens set ?", payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  getTokenById: async (id) => {
    const payload = [
      id,
    ]
  
    try {
      return await db.query("SELECT * FROM tokens WHERE id = ?", payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  initiateSession: (token, userID, tokenID) => {
    Token.sessions[tokenID] = {
			token: token,
			userID: userID,
			tokenID: tokenID
    }
    
  },
  
};

module.exports = Token;