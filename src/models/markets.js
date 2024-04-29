const db = require("./../common/db-helper");

const Market = {
  sessions: {},
  createMarket: async (userID, troops, jets, tanks, turrets) => {
    const payload = {
      
      userid: userID,
      troops: troops,
      jets,
      tanks,
      turrets
    };

    try {
      return await db.query("INSERT INTO markets set ?", payload);
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

module.exports = Market;